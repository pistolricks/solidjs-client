import {Component, createEffect, lazy, Show, VoidComponent} from "solid-js";
import {AccessorWithLatest, createAsync} from "@solidjs/router";
import {USER} from "~/lib/store";
import {getUser, redirectTo} from "~/lib/users";
const ResendActivateEmailForm = lazy(() => import( "~/components/users/forms/resend-activate-email-form"));
const LoginUserForm = lazy(() => import('~/components/users/forms/login-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));
const AppLayout = lazy(() => import("~/components/layouts/app-layout"));


const Resend: Component<VoidComponent> = () => {

    const userData: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());

    const user = () => userData() ?? undefined;

    createEffect(() => {
        if (user()?.activated) {
            redirectTo("/")
        }
    })

    return (
        <AppLayout>
            <FormLayout>
                <Show
                    fallback={<LoginUserForm/>}
                    when={user()} keyed>
                    {(user: USER) => (
                        <Show
                            fallback={<ResendActivateEmailForm/>}
                            when={user.activated}>
                            <>TEST</>
                        </Show>
                    )}
                </Show>

            </FormLayout>
        </AppLayout>
    );
};

export default Resend;