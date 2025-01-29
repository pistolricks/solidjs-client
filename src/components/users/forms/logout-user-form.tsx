import {Component, createEffect, createMemo, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {logoutUserHandler, resendActivateEmailHandler} from "~/lib/users";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";

type PROPS = {}

const LogoutUserForm: Component<PROPS> = props => {
    const submission = useSubmission(logoutUserHandler);


    const results = createMemo(() => {
        console.log(submission, submission.result)
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
            <form class={'space-y-4'} action={logoutUserHandler} method="post">
                <div class={'flex justify-end space-x-2'}>
                    <Button as={"button"} variant={'default'} type={"submit"}>Logout</Button>
                </div>
            </form>
        </>
    );
};

export default LogoutUserForm;