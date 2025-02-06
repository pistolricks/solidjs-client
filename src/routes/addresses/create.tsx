import {Component, createEffect, lazy, Show} from "solid-js";
import CreateAddressForm from "~/components/addresses/forms/create-address-form";
import {AccessorWithLatest, createAsync, RouteSectionProps} from "@solidjs/router";
import {CountryData} from "~/lib/store";
import {getAddressFormFormats} from "~/lib/addresses";
import {getVendors} from "~/lib/vendors";

const FormLayout = lazy(() => import( "~/components/layouts/form-layout"));

export const route = {
    preload() {
        getAddressFormFormats();
    }
}


const Create: Component<RouteSectionProps> = props => {
    const formFormats: AccessorWithLatest<CountryData | undefined> = createAsync(async () => getAddressFormFormats());

    createEffect(() => {
        console.log(formFormats())
    })

    return (
        <FormLayout title="Add Address">
            <Show when={formFormats()}>
                <CreateAddressForm {...formFormats()}/>
            </Show>
        </FormLayout>
    );
};

export default Create;