import {Component, lazy, VoidComponent} from "solid-js";
const FormLayout = lazy(() => import( "~/components/layouts/form-layout"));
const CreateVendorForm = lazy(() => import( "~/components/vendors/forms/create-vendor-form"));


const Create: Component<VoidComponent> = () => {

    return (
        <FormLayout title="Add Vendor">
            <CreateVendorForm/>
        </FormLayout>
    );
};

export default Create;