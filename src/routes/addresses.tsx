import {Component, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

const AddressesLayout: Component<RouteSectionProps> = props => {

    return (
        <>
            {props.children}
        </>
    );
};

export default AddressesLayout;