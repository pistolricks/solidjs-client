import {Component, lazy, VoidComponent} from "solid-js";
import LoginUserForm from '~/components/users/forms/login-user-form';
import FormLayout from "~/components/layouts/form-layout";
import AppLayout from "~/components/layouts/app-layout";


const Login: Component<VoidComponent> = () => {

    return (
        <AppLayout>
            <FormLayout>
                <LoginUserForm/>
            </FormLayout>
        </AppLayout>
    );
};

export default Login;