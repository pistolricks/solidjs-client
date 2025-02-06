import {Component, lazy, VoidComponent} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";
const LoginUserForm = lazy(() => import('~/components/users/forms/login-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));
const AppLayout = lazy(() => import("~/components/layouts/app-layout"));

const Login: Component<RouteSectionProps> = props => {

    return (
        <AppLayout {...props}>
            <FormLayout>
                <LoginUserForm/>
            </FormLayout>
        </AppLayout>
    );
};

export default Login;