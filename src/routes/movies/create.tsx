import {Component, lazy, VoidComponent} from "solid-js";
import LoginUserForm from '~/components/users/forms/login-user-form';
import FormLayout from "~/components/form-layout";
import AppLayout from "~/components/app-layout";
import CreateMovieForm from "~/components/movies/forms/create-movie-form";


const Create: Component<VoidComponent> = () => {

    return (
        <AppLayout>
            <FormLayout>
                <CreateMovieForm/>
            </FormLayout>
        </AppLayout>
    );
};

export default Create;