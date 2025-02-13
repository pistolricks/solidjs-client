import {Component, For} from "solid-js";
import {AddressData} from "~/lib/store";

type PROPS = {
    addresses: AddressData | undefined;
}

const AddressesList: Component<PROPS> = props => {
    const addresses = () => props.addresses?.addresses;
    return (
        <ul class={'text-gray-11 space-y-8 text-center'}>
            <For each={addresses()}>
                {(address, i) => (
                    <li class={''}>

                        <span class={'text-tomato-normal'}>{address.administrative_area}</span>

                        <div class={'space-x-1'}>
                            <For each={address?.street_address}>
                                {(line) => (
                                    <span class={''}>{line}</span>
                                )}
                            </For>
                        </div>
                    </li>
                )}
            </For>
        </ul>
    );
};

export default AddressesList;