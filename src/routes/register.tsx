import {Component} from "solid-js";
import RegisterUserForm from '~/components/users/forms/register-user-form';
import FormLayout from "~/components/form-layout";
import AppLayout from "~/components/app-layout";

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