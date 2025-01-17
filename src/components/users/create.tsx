import {Component}                from "solid-js";
import {A, Navigate, useNavigate} from "@solidjs/router";
import {registerUserHandler}           from "~/lib/users";

type PROPS = {}

const CreateUser: Component<PROPS> = props => {
    
    
    return (
        <>
            <form action={registerUserHandler} method="post">
                <input type="text" required name="firstName" placeholder="First Name"/>
                <input type="text" required name="lastName" placeholder="Last Name"/>
                <input type="email" required name="email" placeholder="email" />
                <input type="password" required name="password" placeholder="********"/>
                <button type="submit">Add User</button>
            </form>
            <A  href={"/"}>Go Back</A>
        </>
    );
};

export default CreateUser;