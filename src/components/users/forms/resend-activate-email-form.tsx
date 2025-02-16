import {Component, createEffect, createMemo, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {resendActivateEmailHandler} from "~/lib/users";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";
import {ChevronLeft} from "~/components/users/forms/login-user-form";

type PROPS = {}

const ResendActivateEmailForm: Component<PROPS> = props => {
    const submission = useSubmission(resendActivateEmailHandler);


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
            <form class={'space-y-4'} action={resendActivateEmailHandler} method="post">
                <TextField>
                    <TextFieldInput type="email" autocomplete={'username'} name="email" placeholder="Email"/>
                    <Show when={results()?.error?.email}>
                        <TextFieldErrorMessage>
                            {results()?.error?.email}
                        </TextFieldErrorMessage>
                    </Show>

                </TextField>
                <div class={'flex justify-end space-x-2'}>
                    <Button as={"A"} href={'/activate'} variant={'secondary'} size={"icon"} type={"button"}><ChevronLeft/></Button>
                    <Button as={"button"} variant={'default'} type={"submit"}>Resend</Button>
                </div>
            </form>
        </>
    );
};

export default ResendActivateEmailForm;