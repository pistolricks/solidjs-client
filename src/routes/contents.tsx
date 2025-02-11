import {Component, JSXElement} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

type PROPS = {
    children: JSXElement
}
const ContentsLayout: Component<PROPS> = props => {

    return (
        <>
            {props.children}
        </>
    );
};

export default ContentsLayout;