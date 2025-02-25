import {Component, JSXElement, ParentProps} from "solid-js";


const ChatLayout: Component<ParentProps> = props => {

    return (
        <div>
            {props.children}
        </div>
    );
};

export default ChatLayout;