import {Component, lazy}  from "solid-js";

const LoginUserForm = lazy(() => import('~/components/users/login-user-form'));

type PROPS = {}

const Login: Component<PROPS> = props => {

    return (
        <LoginUserForm />
    );
};

export default Login;