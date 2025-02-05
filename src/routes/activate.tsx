import {Component, lazy, Match, Show, Switch, VoidComponent} from "solid-js";
import ActivateUserForm from '~/components/users/forms/activate-user-form';
import FormLayout from "~/components/layouts/form-layout";
import AppLayout from "~/components/layouts/app-layout";
import {AccessorWithLatest, createAsync} from "@solidjs/router";
import {USER} from "~/lib/store";
import {getUser} from "~/lib/users";
const LoginUserForm = lazy(() => import("~/components/users/forms/login-user-form"));

const Activate: Component<VoidComponent> = () => {

    const userData: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());

    const user = () => userData() ?? undefined;


    return (
        <AppLayout>
            <FormLayout>
                <Switch>
                 <Match when={user()?.activated}>
                     <LoginUserForm/>
                 </Match>
                    <Match when={!user()?.activated}>
                        <ActivateUserForm/>
                    </Match>
                    <Match when={!user()}>
                        <ActivateUserForm/>
                    </Match>
                </Switch>
            </FormLayout>
        </AppLayout>
    );
};

export default Activate;