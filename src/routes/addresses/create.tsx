import {Component, lazy, VoidComponent} from "solid-js";
import CreateAddressForm from "~/components/addresses/forms/create-address-form";

const FormLayout = lazy(() => import( "~/components/layouts/form-layout"));
const CreateVendorForm = lazy(() => import( "~/components/vendors/forms/create-vendor-form"));


const Create: Component<VoidComponent> = () => {

    return (
        <FormLayout title="Add Address">
            <CreateAddressForm/>
        </FormLayout>
    );
};

export default Create;