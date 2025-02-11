import Dialog from '@corvu/dialog'
import type {Component, ParentProps, VoidComponent} from 'solid-js'

type PROPS = ParentProps
const BaseDialog: Component<PROPS> = props => {

    const children = () => props.children;


    return (
        <Dialog>
            {children()}
            <Dialog.Portal>
                <Dialog.Overlay
                    class="fixed inset-0 z-40 bg-black/50 data-open:animate-in data-open:fade-in-0% data-closed:animate-out data-closed:fade-out-0%"/>

            </Dialog.Portal>
        </Dialog>
    )
}

export default BaseDialog