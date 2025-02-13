import {Component, createEffect, createMemo} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {logoutUserHandler} from "~/lib/users";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";
import Drawer from "@corvu/drawer";

type PROPS = {}

const LogoutUserForm: Component<PROPS> = props => {

    return (
        <>
            <form class={''} action={logoutUserHandler} method="post">
                    <Drawer.Trigger contextId={'sd1'} as={"div"}>
                        <Button as={"button"} variant={"ghost"}  size={"wd"} type={"submit"}>LOGOUT</Button>
                    </Drawer.Trigger>
            </form>
        </>
    );
};

export default LogoutUserForm;