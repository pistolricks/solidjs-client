import {Component, JSXElement} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

type PROPS = {
    children: JSXElement
}
const ContentsLayout: Component<PROPS> = props => {

    return (
        <div>
            {props.children}
        </div>
    );
};

export default ContentsLayout;