import {Component, ParentProps, Suspense} from "solid-js";
import SideDrawer from "~/components/ui/dialogs/side-drawer";
import Nav from "~/components/layouts/partials/nav";
import BaseDialog from "~/components/ui/dialogs/base-dialog";
import {AccessorWithLatest, createAsync, useLocation} from "@solidjs/router";
import {USER} from "~/lib/store";
import {getUser} from "~/lib/users";

type PROPS = ParentProps
export const route = {
    preload() {
        getUser();
    }
}
const AppLayout: Component<PROPS> = props => {
    const children = () => props.children;

    const user: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());
    const location = useLocation();
    const path = () => location.pathname;

    console.log('name', user()?.name)

    return (
        <SideDrawer>
            <Nav user={user()} path={path()} />
            <BaseDialog>
                {children()}
            </BaseDialog>
        </SideDrawer>
    );
};

export default AppLayout;