import {Component, JSXElement} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";

type PROPS = {
    children: JSXElement
}
const ChatLayout: Component<PROPS> = props => {

    return (
        <div>
            {props.children}
        </div>
    );
};

export default ChatLayout;