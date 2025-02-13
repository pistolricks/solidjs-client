import {Component, createEffect, lazy} from "solid-js";
import {createAsync, RouteDefinition, RouteSectionProps} from "@solidjs/router";
import {getVendor} from "~/lib/vendors";
import {Feature, VENDOR_DETAIL} from "~/lib/store";
import {GeoJSON, Geometry, Point} from "geojson";
const DetailsLayout = lazy(() => import("~/components/layouts/details-layout"));
const VendorDetails = lazy(() => import("~/components/vendors/details"));

export const route = {
    preload({params}) {
        getVendor(+params.id);
    }
} satisfies RouteDefinition

type PROPS = RouteSectionProps;

const View: Component<PROPS> = props => {

    const vendorData: () => Feature<Point, number, any> = createAsync(async () => getVendor(+props.params.id))


    createEffect(() => console.log(vendorData()))


    return (
        <DetailsLayout>
            <VendorDetails details={vendorData()}/>
        </DetailsLayout>
    );
};

export default View;