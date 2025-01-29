import {Accessor, Component, createEffect, lazy, Show, VoidComponent} from "solid-js";
import ActivateUserForm from '~/components/users/forms/activate-user-form';
import FormLayout from "~/components/layouts/form-layout";
import AppLayout from "~/components/layouts/app-layout";
import {AccessorWithLatest, createAsync} from "@solidjs/router";
import {USER} from "~/lib/store";
import {getUser, redirectTo} from "~/lib/users";
import LoginUserForm from "~/components/users/forms/login-user-form";
import ResendActivateEmailForm from "~/components/users/forms/resend-activate-email-form";


const Resend: Component<VoidComponent> = () => {

    const userData: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());

    const user = () => userData() ?? undefined;

    createEffect(() => {
        if(user()?.activated) {
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