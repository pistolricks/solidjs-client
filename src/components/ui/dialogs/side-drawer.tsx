import Drawer from '@corvu/drawer'

import SideNavMenu from "~/components/layouts/partials/side-nav-menu";
import {createEffect, JSXElement} from "solid-js";
import DrawerPrimitive from "@corvu/drawer";

type PROPS = {
    children?: JSXElement
}

function SideDrawer(props: PROPS) {
    const children = () => props.children;

    return (
        <DrawerPrimitive contextId={'sd1'}  breakPoints={[0.75]} side={"right"}>
            {(props) => (
                <>

                    {children()}

                    <Drawer.Portal contextId={'sd1'}>
                        <Drawer.Overlay
                            contextId={'sd1'}
                            style={{
                                'background-color': `rgb(0 0 0 / ${
                                    0.5 * props.openPercentage
                                })`,
                            }}
                        />

                    </Drawer.Portal>
                </>
            )}
        </DrawerPrimitive>
    )
}

export default SideDrawer