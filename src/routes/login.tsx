import {Component, lazy} from "solid-js";
import LoginUserForm from '~/components/users/login-user-form';

type PROPS = {}

const Login: Component<PROPS> = props => {

    return (
        <div class={'p-4'}>
            <LoginUserForm/>
        </div>
    );
};

export default Login;