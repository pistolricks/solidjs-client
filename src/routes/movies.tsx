import {Component, JSXElement} from "solid-js";
import AppLayout from "~/components/layouts/app-layout";
import {RouteSectionProps} from "@solidjs/router";

const MoviesLayout: Component<RouteSectionProps> = props => {

    return (
        <AppLayout>
            {props.children}
        </AppLayout>
    );
};

export default MoviesLayout;