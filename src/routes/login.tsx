import {Component, lazy, VoidComponent} from "solid-js";
import {createAsync, RouteSectionProps} from "@solidjs/router";
import {showLoginHandler} from "~/lib/users";
const LoginUserForm = lazy(() => import('~/components/users/forms/login-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));

const Login: Component<RouteSectionProps> = props => {
    const message = createAsync(async () => showLoginHandler());
    return (
            <FormLayout>
                <LoginUserForm/>
            </FormLayout>
    );
};

export default Login;