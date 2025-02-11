import {Component, JSXElement, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

type PROPS = {
    children: JSXElement
}

const VendorsLayout: Component<PROPS> = props => {

    return (
        <main>
            {props.children}
        </main>
    );
};

export default VendorsLayout;