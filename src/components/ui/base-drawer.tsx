import Drawer from '@corvu/drawer'

import SideNavMenu from "~/components/layouts/partials/side-nav-menu";
import {createEffect, JSXElement} from "solid-js";

type PROPS = {
    children?: JSXElement
}

function BaseDrawer(props: PROPS) {
    const children = () => props.children;

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

                    </Drawer.Portal>
                </>
            )}
        </Drawer>
    )
}

export default BaseDrawer