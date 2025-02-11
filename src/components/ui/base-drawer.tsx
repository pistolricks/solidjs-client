import Drawer from '@corvu/drawer'

import SideNavMenu from "~/components/layouts/partials/side-nav-menu";
import {createEffect, JSXElement} from "solid-js";

type PROPS = {
    data?: any
    children?: JSXElement
}

function BaseDrawer(props: PROPS) {
    const children = () => props.children;

    const data = () => props.data as any;

    const title = () => data()?.title ?? import.meta.env.VITE_APP_TITLE;

    createEffect(() => console.log(data()?.user))

    return (
        <Drawer  breakPoints={[0.75]} side={"right"}>
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