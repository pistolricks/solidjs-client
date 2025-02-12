import {Component, createEffect, createMemo, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {resendActivateEmailHandler} from "~/lib/users";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";
import {ChevronLeft} from "~/components/svg";

type PROPS = {}

const ResendActivateEmailForm: Component<PROPS> = props => {
    const submission = useSubmission(resendActivateEmailHandler);


    const results = createMemo(() => {
        console.log("submission", submission)
        console.log("submission-result", submission.result)
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
                <div class={'items-center flex flex-row-reverse space-x-2 space-x-reverse'}>
                    <Button as={"button"} variant={'default'} type={"submit"}>Resend</Button>
                    <Button
                        as={"A"}
                        href={'/activate'}
                        variant={'secondary'}
                        size={"icon"}
                        type={"button"}
                    >
                        <ChevronLeft/>
                    </Button>
                </div>
            </form>
        </>
    );
};

export default ResendActivateEmailForm;