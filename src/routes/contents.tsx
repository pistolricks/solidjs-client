import {Component, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

const AppLayout = lazy(() => import("~/components/layouts/app-layout"));

const ContentsLayout: Component<RouteSectionProps> = props => {

    return (
        <AppLayout {...props}>
            {props.children}
        </AppLayout>
    );
};

export default ContentsLayout;