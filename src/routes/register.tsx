import {Component, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";
const RegisterUserForm = lazy(() => import('~/components/users/forms/register-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));

type PROPS = {}

const Register: Component<RouteSectionProps> = props => {

    return (
            <FormLayout>
                <RegisterUserForm/>
            </FormLayout>
    );
};

export default Register;