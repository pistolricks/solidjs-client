import {Component, ParentProps} from "solid-js";
import {SidebarProvider, SidebarTrigger} from "~/components/ui/sidebar";
import AppSidebar from "~/components/layouts/partials/app-sidebar";

type PROPS = ParentProps

const CategoryLayout: Component<PROPS> = props => {

    return (

            <main class="container mx-auto p-4">
                {props.children}
            </main>

    );
};

export default CategoryLayout;