import {Component, createEffect, createMemo, Show} from "solid-js";
import {useNavigate, useSubmission} from "@solidjs/router";
import {loginUserHandler} from "~/lib/users";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";

type PROPS = {}

const LoginUserForm: Component<PROPS> = props => {
    const submission = useSubmission(loginUserHandler);
    const navigate = useNavigate();


    const results = createMemo(() => {
        return submission.result
    })

    createEffect(() => {
        if (results()?.error) {
            showToast({
                variant: "error",
                title: "Error",
                description: results()?.error
            })
        }
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
                    <Button as={"A"} href={'/'} variant={'secondary'} size={"icon"} type={"button"}><ChevronLeft/></Button>
                    <Button as={"button"} variant={'default'} type={"submit"}>Login</Button>
                </div>
            </form>
        </>
    );
};

export default LoginUserForm;

export const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor"
         class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
    </svg>
)

