import {Component, JSXElement, lazy} from "solid-js";
const AppLayout = lazy(() => import("~/components/layouts/app-layout"));
import {RouteSectionProps} from "@solidjs/router";

const MoviesLayout: Component<RouteSectionProps> = props => {

    return (
        <AppLayout>
            {props.children}
        </AppLayout>
    );
};

export default MoviesLayout;