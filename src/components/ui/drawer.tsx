import Drawer from '@corvu/drawer'
import {RouteSectionProps} from "@solidjs/router";

function BaseDrawer<T>(props: RouteSectionProps<T>) {
    const children = () => props.children;


    const data = () => props.data as T | any;

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
                        <Drawer.Content class={"w-full sm:max-w-lg"}>
                            <Drawer.Label class={'text-gray-8 flex justify-between items-center p-4'}>
                                <span>{data()?.title} </span>
                                <span>{data()?.logout}</span>
                            </Drawer.Label>
                            <Drawer.Description>

                            </Drawer.Description>

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