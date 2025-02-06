import {Component, createEffect, createMemo} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {logoutUserHandler} from "~/lib/users";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";
import Drawer from "@corvu/drawer";

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
    })
    return (
        <>
            <form class={''} action={logoutUserHandler} method="post">
                    <Drawer.Trigger as={"div"}>
                        <Button as={"button"} variant={"ghost"}  size={"wd"} type={"submit"}>LOGOUT</Button>
                    </Drawer.Trigger>
            </form>
        </>
    );
};

export default LogoutUserForm;