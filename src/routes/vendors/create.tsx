import {Component, VoidComponent} from "solid-js";
import FormLayout from "~/components/layouts/form-layout";
import CreateVendorForm from "~/components/vendors/forms/create-vendor-form";


const Create: Component<VoidComponent> = () => {

    return (
        <FormLayout title="Add Vendor">
            <CreateVendorForm/>
        </FormLayout>
    );
};

export default Create;