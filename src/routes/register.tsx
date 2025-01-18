import {Component, lazy} from "solid-js";

const RegisterUserForm = lazy(() => import('~/components/users/register-user-form'));

type PROPS = {}

const Register: Component<PROPS> = props => {

    return (
        <div class={'p-4'}>
            <RegisterUserForm/>
        </div>
    );
};

export default Register;