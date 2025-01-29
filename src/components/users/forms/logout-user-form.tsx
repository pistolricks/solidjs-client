import {Component, createEffect, createMemo} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {logoutUserHandler} from "~/lib/users";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";

type PROPS = {}

const LogoutUserForm: Component<PROPS> = props => {
    const submission = useSubmission(logoutUserHandler);


    const results = createMemo(() => {
        console.log("submission", submission, submission.result)
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

        if (submission?.pending) {
            showToast({
                variant: "success",
                title: "Logged Out",
                description: "You have been logged out"
            })
        }
    })
    return (
        <>
            <form class={'space-y-4'} action={logoutUserHandler} method="post">
                <div class={'flex justify-end space-x-2'}>
                    <Button as={"button"} variant={'secondary'} size={"wd"} type={"submit"}>Logout</Button>
                </div>
            </form>
        </>
    );
};

export default LogoutUserForm;