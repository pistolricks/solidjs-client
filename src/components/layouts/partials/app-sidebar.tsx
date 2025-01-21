import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader, SidebarInput
} from "~/components/ui/sidebar"
import {Component} from "solid-js";

type PROPS = {
    title: string;
}
const AppSidebar: Component<PROPS> = props => {

    const title = () => props.title;

    return (
        <Sidebar class={'bg-gray-subtle'}>
            <SidebarHeader class={'bg-gray-subtle text-gray-dim'}>
                {title()}
                <SidebarInput class={'rounded'} placeholder={'Search...'}/>
            </SidebarHeader>

            <SidebarContent class={'bg-gray-subtle'}>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter class={'bg-gray-subtle'} />
        </Sidebar>
    )
}

export default AppSidebar;