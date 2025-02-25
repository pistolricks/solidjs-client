import {Component, ParentProps} from "solid-js";


const AddressesLayout: Component<ParentProps> = props => {

    return (
        <div>
            {props.children}
        </div>
    );
};

export default AddressesLayout;