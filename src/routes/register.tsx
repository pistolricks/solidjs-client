import {Component, createEffect, lazy} from "solid-js";
import {AccessorWithLatest, createAsync, RouteSectionProps, useNavigate} from "@solidjs/router";
import {AUTHENTICATION_TOKEN, getUserToken} from "~/lib";

const RegisterUserForm = lazy(() => import('~/components/users/forms/register-user-form'));
const FormLayout = lazy(() => import("~/components/layouts/form-layout"));

type PROPS = {}

const Register: Component<RouteSectionProps> = props => {
    const navigate = useNavigate();
    const token: AccessorWithLatest<AUTHENTICATION_TOKEN | undefined> = createAsync(async () => getUserToken());


    createEffect(() => {
        if (token()) {
            navigate('/', {replace: true});
        }
    })
    return (
        <FormLayout>
            <RegisterUserForm/>
        </FormLayout>
    );
};

export default Register;