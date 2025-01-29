import {Component, lazy} from "solid-js";
const RegisterUserForm = lazy(() => import('~/components/users/forms/register-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));
const AppLayout = lazy(() => import("~/components/layouts/app-layout"));

type PROPS = {}

const Register: Component<PROPS> = props => {

    return (
        <AppLayout>
            <FormLayout>
                <RegisterUserForm/>
            </FormLayout>
        </AppLayout>
    );
};

export default Register;