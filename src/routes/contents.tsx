import {Component, JSXElement, ParentProps} from "solid-js";

const ContentsLayout: Component<ParentProps> = props => {

    return (
        <div>
            {props.children}
        </div>
    );
};

export default ContentsLayout;