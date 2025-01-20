import {Component, lazy} from "solid-js";
import RegisterUserForm from '~/components/users/forms/register-user-form';
import FormLayout from "~/components/users/forms/layout";

type PROPS = {}

const Register: Component<PROPS> = props => {

    return (
        <FormLayout>
            <RegisterUserForm/>
        </FormLayout>
    );
};

export default Register;