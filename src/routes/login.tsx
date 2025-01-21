import {Component, lazy, VoidComponent} from "solid-js";
import LoginUserForm from '~/components/users/forms/login-user-form';
import FormLayout from "~/components/form-layout";
import AppLayout from "~/components/app-layout";


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