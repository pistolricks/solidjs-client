import {Component, lazy, VoidComponent} from "solid-js";
import LoginUserForm from '~/components/users/forms/login-user-form';
import FormLayout from "~/components/users/forms/layout";


const Login: Component<VoidComponent> = () => {

    return (
        <FormLayout>
            <LoginUserForm/>
        </FormLayout>
    );
};

export default Login;