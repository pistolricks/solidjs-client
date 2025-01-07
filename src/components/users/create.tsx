import {Component}                from "solid-js";
import {A, Navigate, useNavigate} from "@solidjs/router";

type PROPS = {}

const CreateUser: Component<PROPS> = props => {
    const navigate = useNavigate();
    
    return (
        <>
            <form method="post" onSubmit={(e) => {
                e.preventDefault();
                const form: any = e.target;
                fetch(`http://localhost:${import.meta.env.VITE_CLIENT_PORT}/api/users`, {
                    method: "POST",
                    body: JSON.stringify({
                        firstName: form.firstName.value,
                        lastName: form.lastName.value,
                        age: form.age.value
                    }),
                }).then(() => navigate("/"));
            }}>
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