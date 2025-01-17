import {Component, createEffect, createMemo, Show} from "solid-js";
import {A, useSubmission}                          from "@solidjs/router";
import {registerUserHandler}                       from "~/lib/users";

type PROPS = {}

const RegisterUserForm: Component<PROPS> = props => {
    const submission = useSubmission(registerUserHandler);
    createEffect(() => {
        if (submission.pending) console.log(submission.result, "error", submission.result, "result");
    });

    const results = createMemo(() => {
        return submission.result
    })
    return (
        <>
            <form action={registerUserHandler} method="post">
                <input type="text" required name="firstName" placeholder="First Name"/>
                <input type="text" required name="lastName" placeholder="Last Name"/>
                <input type="email" required name="email" placeholder="email"/>
                <input type="password" required name="password" placeholder="********"/>
                <button type="submit">Register</button>
            </form>

            <Show when={results()?.error?.email}>
                {results()?.error?.email}
            </Show>

            <A href={"/"}>Go Back</A>
        </>
    );
};

export default RegisterUserForm;