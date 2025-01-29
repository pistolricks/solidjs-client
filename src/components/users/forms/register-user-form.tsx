import {Component, createEffect, createMemo, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {registerUserHandler} from "~/lib/users";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "~/components/ui/button";
import {showToast} from "~/components/ui/toast";
import {ChevronLeft} from "~/components/users/forms/login-user-form";

type PROPS = {}

const RegisterUserForm: Component<PROPS> = props => {
    const submission = useSubmission(registerUserHandler);


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
            <form class={'space-y-4'} action={registerUserHandler} method="post">
                <TextField>
                    <TextFieldInput type="text" required name="firstName" placeholder="First Name"/>
                    <Show when={results()?.error?.firstName}>
                        <TextFieldErrorMessage>
                            {results()?.error?.firstName}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="text" required name="lastName" placeholder="Last Name"/>
                    <Show when={results()?.error?.lastName}>
                        <TextFieldErrorMessage>
                            {results()?.error?.lastName}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="email" required name="email" placeholder="email"/>
                    <Show when={results()?.error?.email}>
                        <TextFieldErrorMessage>
                            {results()?.error?.email}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="password" autocomplete={'none'} required name="password"
                                    placeholder="********"/>
                    <Show when={results()?.error?.password}>
                        <TextFieldErrorMessage>
                            {results()?.error?.password}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <div class={'flex justify-end space-x-2'}>
                    <Button as={"A"} href={'/'} variant={'secondary'} size={"icon"}
                            type={"button"}><ChevronLeft/></Button>
                    <Button as={"button"} variant={'default'} type={"submit"}>Register</Button>
                </div>
            </form>


        </>
    );
};

export default RegisterUserForm;