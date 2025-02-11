import {Component, ParentProps, Suspense} from "solid-js";
import BaseDrawer from "~/components/ui/base-drawer";
import Nav from "~/components/layouts/partials/nav";
import BaseDialog from "~/components/ui/base-dialog";

type PROPS = ParentProps

const AppLayout: Component<PROPS> = props => {
    const children = () => props.children;
    return (
        <BaseDrawer>
            <Nav/>
            <BaseDialog>
                {children()}
            </BaseDialog>
        </BaseDrawer>
    );
};

export default AppLayout;