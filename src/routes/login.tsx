import {Component, createEffect, lazy, VoidComponent} from "solid-js";
import {AccessorWithLatest, createAsync, RouteSectionProps, useNavigate} from "@solidjs/router";
import {AUTHENTICATION_TOKEN, getUserToken} from "~/lib";

const LoginUserForm = lazy(() => import('~/components/users/forms/login-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));

const Login: Component<RouteSectionProps> = props => {
    const navigate = useNavigate();
    const token: AccessorWithLatest<AUTHENTICATION_TOKEN | undefined> = createAsync(async () => getUserToken());



    createEffect(() => {
        if (token()) {
            navigate('/', {replace: true});
        }
    })

    return (

        <FormLayout>
            <LoginUserForm/>
        </FormLayout>
    );
};

export default Login;