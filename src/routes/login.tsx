import {Component, lazy, VoidComponent} from "solid-js";
import LoginUserForm from '~/components/users/login-user-form';


const Login: Component<VoidComponent> = () => {

    return (
        <div class={'p-4'}>
            <LoginUserForm/>
        </div>
    );
};

export default Login;