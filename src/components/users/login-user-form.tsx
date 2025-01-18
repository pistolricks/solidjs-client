import {Component, createEffect, createMemo, Show} from "solid-js";
import {A, useSubmission} from "@solidjs/router";
import {loginUserHandler} from "~/lib/users";
import {TextField, TextFieldInput} from "~/components/ui/text-field";
import { Button } from "../ui/button";

type PROPS = {}

const LoginUserForm: Component<PROPS> = props => {
    const submission = useSubmission(loginUserHandler);
    createEffect(() => {
        if (submission.pending) console.log(submission.result, "error", submission.result, "result");
    });

    const results = createMemo(() => {
        return submission.result
    })
    return (
        <>
            <form action={loginUserHandler} method="post">
                <TextField>
                    <TextFieldInput type="email" name="email" placeholder="email"/>
                    <TextFieldInput type="password" required name="password" placeholder="********"/>
                </TextField>
                <Button as={"button"} type={"submit"}>Login</Button>


                <button type="submit">Login</button>
            </form>

            <Show when={results()?.error?.email}>
                {results()?.error?.email}
            </Show>

            <A href={"/"}>Go Back</A>
        </>
    );
};

export default LoginUserForm;