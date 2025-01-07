import {Component}                from "solid-js";
import {A, Navigate, useNavigate} from "@solidjs/router";
import {addStorageUser}           from "~/lib/users";

type PROPS = {}

const CreateUser: Component<PROPS> = props => {
    
    
    return (
        <>
            <form action={addStorageUser} method="post">
                <input type="text" required name="firstName" placeholder="First Name"/>
                <input type="text" required name="lastName" placeholder="Last Name"/>
                <input type="number" required name="age" placeholder="Age" min={0}/>
                <button type="submit">Add User</button>
            </form>
            <A  href={"/"}>Go Back</A>
        </>
    );
};

export default CreateUser;