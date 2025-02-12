import {Component, createEffect, lazy, Show, VoidComponent} from "solid-js";
import {AccessorWithLatest, createAsync, RouteSectionProps} from "@solidjs/router";
import {USER} from "~/lib/store";
import {getUser} from "~/lib/users";
import {redirectTo} from "~/lib";

const ResendActivateEmailForm = lazy(() => import( "~/components/users/forms/resend-activate-email-form"));
const LoginUserForm = lazy(() => import('~/components/users/forms/login-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));


const Resend: Component<RouteSectionProps> = props => {

    const userData: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());

    const user = () => userData() ?? undefined;

    createEffect(() => {
        if (user()?.activated) {
            redirectTo("/")
        }
    })

    return (
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
    );
};

export default Resend;