import {Component, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";


const VendorsLayout: Component<RouteSectionProps> = props => {

    return (
        <>
            {props.children}
        </>
    );
};

export default VendorsLayout;