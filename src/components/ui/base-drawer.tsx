import Drawer from '@corvu/drawer'
import {RouteSectionProps} from "@solidjs/router";
import {Dynamic} from "solid-js/web";
import SideNavMenu from "~/components/layouts/partials/side-nav-menu";
import {createEffect} from "solid-js";

function BaseDrawer<T>(props: RouteSectionProps<T>) {
    const children = () => props.children;

    const data = () => props.data as T | any;

    const title = () => data()?.title ?? import.meta.env.VITE_APP_TITLE;

    const component = () => data()?.menu ?? SideNavMenu;


    createEffect(() => console.log(data()?.user))

    return (
        <Drawer breakPoints={[0.75]} side={"right"}>
            {(props) => (
                <>

                    {children()}

                    <Drawer.Portal>
                        <Drawer.Overlay
                            style={{
                                'background-color': `rgb(0 0 0 / ${
                                    0.5 * props.openPercentage
                                })`,
                            }}
                        />
                        <Drawer.Content class={"w-screen sm:max-w-lg"}>
                            <Drawer.Label class={'text-gray-8 flex justify-between items-center p-4'}>
                            </Drawer.Label>
                            <Drawer.Description>


                            </Drawer.Description>
                            <Dynamic title={title()} component={component()}/>
                            {/*
                            <p class="hidden_frog">🐸 You found froggy!</p>
                           */}
                        </Drawer.Content>
                    </Drawer.Portal>
                </>
            )}
        </Drawer>
    )
}

export default BaseDrawer