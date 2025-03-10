import {Component, ParentProps} from "solid-js";

const VendorsLayout: Component<ParentProps> = props => {

    return (
        <div>
            {props.children}
        </div>
    );
};

export default VendorsLayout;