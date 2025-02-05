import {AccessorWithLatest, createAsync, RouteSectionProps, useLocation} from "@solidjs/router";
import {USER} from "~/lib/store";
import {Component, createEffect, JSXElement, lazy} from "solid-js";
const Nav = lazy(() => import('~/components/layouts/partials/nav'));
import {getUser} from "~/lib/users";
import BaseDrawer from "~/components/ui/drawer";
const LogoutUserForm = lazy(() => import("~/components/users/forms/logout-user-form"));


type PROPS = RouteSectionProps

export const route = {
    preload() {
        getUser();
    }
}

const AppLayout: Component<PROPS> = props => {
    const location = useLocation();

    const userData: AccessorWithLatest<USER | undefined> = createAsync(async () => getUser());

    const user = () => userData() ?? undefined;

    createEffect(() => console.log('activate', user()))
    return (
        <div class={''}>
            <BaseDrawer<any> {...props} data={{
                title: user()?.name ?? "Login",
                menu: [],
                logout: LogoutUserForm
            }}>
            <header class={"relative h-[50px] w-full"}>
                <Nav user={userData()} path={location.pathname}/>
            </header>

            {props.children}
            </BaseDrawer>
        </div>
    );
}

export default AppLayout;