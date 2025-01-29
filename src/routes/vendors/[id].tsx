import {Component, createEffect} from "solid-js";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {getVendor} from "~/lib/vendors";
import {VENDOR_DETAIL} from "~/lib/store";
import DetailsLayout from "~/components/layouts/details-layout";
import VendorDetails from "~/components/vendors/details";

export const route = {
    preload({params}) {
        getVendor(+params.id);
    }
} satisfies RouteDefinition

type PROPS = RouteSectionProps;

const View: Component<PROPS> = props => {

    const vendorData: () => VENDOR_DETAIL = createAsync(async () => getVendor(+props.params.id))

    const details = () => vendorData();
    createEffect(() => console.log(details()))


    return (
        <DetailsLayout>
            <VendorDetails details={details()}/>
        </DetailsLayout>
    );
};

export default View;