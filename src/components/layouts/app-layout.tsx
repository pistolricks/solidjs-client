import {Component, ParentProps} from "solid-js";
import SideDrawer from "~/components/ui/dialogs/side-drawer";
import Nav from "~/components/layouts/partials/nav";
import {AccessorWithLatest, createAsync, useLocation} from "@solidjs/router";
import {USER} from "~/lib/store";
import {getUser} from "~/lib/users";
import {useLayoutContext} from "~/context/layout-provider";

type PROPS = ParentProps
export const route = {
    preload() {
        getUser();
    }
}
const AppLayout: Component<PROPS> = props => {

    const {getHeight} = useLayoutContext();
    const children = () => props.children;

    const user: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());
    const location = useLocation();
    const path = () => location.pathname;

    console.log('name', user()?.name)

    return (
        <SideDrawer>
            <Nav user={user()} path={path()}/>
            <main
                style={{
                    height: getHeight() + 'px'
                }}>
                {children()}
            </main>
        </SideDrawer>
    );
};

export default AppLayout;