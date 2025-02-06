import {Component, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";
const RegisterUserForm = lazy(() => import('~/components/users/forms/register-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));
const AppLayout = lazy(() => import("~/components/layouts/app-layout"));

type PROPS = {}

const Register: Component<RouteSectionProps> = props => {

    return (
        <AppLayout {...props}>
            <FormLayout>
                <RegisterUserForm/>
            </FormLayout>
        </AppLayout>
    );
};

export default Register;