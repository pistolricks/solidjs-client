import {Component, lazy, VoidComponent} from "solid-js";
import LoginUserForm from '~/components/users/forms/login-user-form';
import FormLayout from "~/components/layouts/form-layout";
import AppLayout from "~/components/layouts/app-layout";
import CreateMovieForm from "~/components/movies/forms/create-movie-form";


const Create: Component<VoidComponent> = () => {

    return (
            <FormLayout title="Add Movie">
                <CreateMovieForm/>
            </FormLayout>
    );
};

export default Create;