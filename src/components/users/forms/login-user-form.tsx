import {Component, createEffect, createMemo, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {loginUserHandler} from "~/lib/users";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../ui/button";

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
            <form class={'space-y-4'} action={loginUserHandler} method="post">
                <TextField>
                    <TextFieldInput type="email" autocomplete={'username'} name="email" placeholder="Email"/>
                    <Show when={results()?.error?.email}>
                        <TextFieldErrorMessage>
                            {results()?.error?.email}
                        </TextFieldErrorMessage>
                    </Show>

                </TextField>
                <TextField>
                    <TextFieldInput type="password" autocomplete={'current-password'} required name="password"
                                    placeholder="Password"/>
                    <Show when={results()?.error?.password}>
                        <TextFieldErrorMessage>
                            {results()?.error?.password}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <div class={'flex justify-end space-x-2'}>
                    <Button as={"button"} variant={'default'} type={"submit"}>Login</Button>
                    <Button as={"A"} href={'/'} variant={'secondary'} type={"button"}>Go Back</Button>
                </div>
            </form>
        </>
    );
};

export default LoginUserForm;