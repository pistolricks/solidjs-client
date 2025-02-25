import {Component, For, JSXElement, lazy} from "solid-js";
import {A} from "@solidjs/router";
import Drawer from "@corvu/drawer";
import {USER} from "~/lib/store";
import {useLayoutContext} from "~/context/layout-provider";

const LogoutUserForm = lazy(() => import("~/components/users/forms/logout-user-form"));
type PROPS = {
    user?: USER
}

const SideNavMenu: Component<PROPS> = props => {

    const {menu, apps} = useLayoutContext();
    const user = () => props.user;
    const title = () => user()?.name ?? "Login"


    const active = (routePath: string) =>
        routePath == path() ? "border-gray-normal" : "border-transparent hover:border-gray-dim";

    const path = () => location.pathname;
    return (
        <aside id="nav-menu-1" aria-label="Side navigation"
               class=" flex flex-col  border-r-slate-200">
            <div class="flex flex-col items-center gap-4 p-6 border-b border-slate-200">
                <div class="shrink-0">
                    <a href="#" class="relative flex items-center justify-center w-12 h-12 text-white rounded-full">
                        <img src="https://i.pravatar.cc/40?img=7" alt="user name" title="user name" width="48"
                             height="48" class="max-w-full rounded-full"/>
                        <span
                            class="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 p-1 text-sm text-white border-2 border-white rounded-full bg-emerald-500"><span
                            class="sr-only"> online </span></span>
                    </a>
                </div>
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0 text-center">
                    <h4 class="w-full text-base truncate text-slate-700">
                        {title()}
                    </h4>
                    <p class="w-full text-sm truncate text-slate-500">Jedi warrior</p>
                </div>
            </div>
            <div class="p-3 border-b border-slate-200 grid grid-cols-3 gap-2">
                <div></div>
                <div></div>
                <LogoutUserForm/>
            </div>
            <div aria-label="side navigation" class="flex-1 overflow-auto divide-y divide-slate-100">
                <div>
                    <ul class="flex flex-col flex-1 gap-1 py-3">
                        <For each={menu}>
                            {(item) => (
                                <li class="px-3">
                                    <MenuItem contextId={'sd1'} {...item}/>
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
                <div>
                    <ul class="grid grid-cols-2 gap-3 p-3 bg-gray-1">
                        <For each={apps}>
                            {(item) => (
                                <MenuItem contextId={'sd1'}{...item}>
                                    <img src={`/${item.href}.jpg`}
                                         class={'h-full w-full rounded border border-gray-500'} alt={item.title}/>
                                </MenuItem>
                            )}
                        </For>
                    </ul>
                </div>
                <div>
                    <h3 class="p-6 pb-0 text-sm font-medium text-slate-400">
                        Contacts
                    </h3>
                    <ul class="flex flex-col flex-1 gap-1 py-3">
                        <li class="px-3">
                            <a href="#"
                               class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-emerald-500 hover:bg-emerald-50 focus:bg-emerald-50 aria-[current=page]:text-emerald-500 aria-[current=page]:bg-emerald-50 ">
            <span class="relative inline-flex items-center justify-center w-6 h-6 text-white rounded-full">
              <img src="https://i.pravatar.cc/24?img=3" alt="user name" title="user name" width="24" height="24"
                   class="max-w-full rounded-full"/>
              <span
                  class="absolute inline-flex items-center justify-center gap-1 p-1 text-sm text-white border-2 border-white rounded-full bg-emerald-500 -top-1 -right-1">
                <span class="sr-only"> offline </span>
              </span>
            </span>
                                <div
                                    class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate">
                                    John Langan
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default SideNavMenu;


type MenuItem = {
    title: string;
    href: string;
    description?: string;
    icon?: string;
}

export const MenuItem: Component<MenuItem & { contextId: string, children?: JSXElement }> = props => {

    const title = () => props.title;
    const href = () => props.href;
    const icon = () => props.icon;
    const contextId = () => props.contextId;

    const children = () => props.children;
    return (
        <Drawer.Trigger contextId={contextId()} as={A} href={href()}
                        class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-emerald-500 hover:bg-emerald-50 focus:bg-emerald-50 aria-[current=page]:text-emerald-500 aria-[current=page]:bg-emerald-50 ">
            <div class="flex items-center self-center w-6">

                {children() || <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6"
                                    aria-label="Dashboard icon">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                </svg>}

            </div>
            <div
                class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate capitalize">
                {title()}
            </div>
        </Drawer.Trigger>
    );
};
