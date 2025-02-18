import {Component, JSXElement, lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";
import {ResponsiveDrawer} from "~/components/ui/dialogs/responsive-drawer";

type PROPS = {
    children: JSXElement
}

const AddressesLayout: Component<PROPS> = props => {

    return (
        <div>
            {props.children}
        </div>
    );
};

export default AddressesLayout;