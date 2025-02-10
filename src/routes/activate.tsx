import {Component, createEffect, lazy, Match, Switch} from "solid-js";
import ActivateUserForm from '~/components/users/forms/activate-user-form';
import FormLayout from "~/components/layouts/form-layout";
import {AccessorWithLatest, createAsync, RouteSectionProps, useNavigate} from "@solidjs/router";
import {USER} from "~/lib/store";
import {getUser} from "~/lib/users";

const Activate: Component<RouteSectionProps> = props => {
    const navigate = useNavigate();

    const userData: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());

    const user = () => userData() ?? undefined;

    createEffect(() => {
        if (user()?.activated) {
            navigate('/')
        }
    })

    return (
        <FormLayout>
            <Switch>
                <Match when={!user()?.activated}>
                    <ActivateUserForm/>
                </Match>
                <Match when={!user()}>
                    <ActivateUserForm/>
                </Match>
            </Switch>
        </FormLayout>
    );
};

export default Activate;