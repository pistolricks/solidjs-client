import {Component, JSXElement, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

type PROPS = {
    children: JSXElement
}

const VendorsLayout: Component<PROPS> = props => {

    return (
        <>
            {props.children}
        </>
    );
};

export default VendorsLayout;