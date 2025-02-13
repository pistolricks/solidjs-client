import Dialog from '@corvu/dialog'
import type {Component, ParentProps, VoidComponent} from 'solid-js'

type PROPS = ParentProps
const BaseDialog: Component<PROPS> = props => {

    const children = () => props.children;


    return (
        <Dialog>
            {children()}
            <Dialog.Portal>
                <Dialog.Overlay/>

            </Dialog.Portal>
        </Dialog>
    )
}

export default BaseDialog