import {Component, lazy, VoidComponent} from "solid-js";
const LoginUserForm = lazy(() => import('~/components/users/forms/login-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));
const AppLayout = lazy(() => import("~/components/layouts/app-layout"));

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