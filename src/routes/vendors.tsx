import {Component, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

const AppLayout = lazy(() => import("~/components/layouts/app-layout"));

const VendorsLayout: Component<RouteSectionProps> = props => {

    return (
        <AppLayout>
            {props.children}
        </AppLayout>
    );
};

export default VendorsLayout;