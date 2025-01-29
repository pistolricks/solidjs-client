import {Component, For} from "solid-js";
import {VendorsData} from "~/lib/store";
import {A} from "@solidjs/router";
import {Button} from "~/components/ui/button";

type PROPS = {
    vendors: VendorsData | undefined;
}

const VendorsList: Component<PROPS> = props => {
    const vendors = () => props.vendors?.vendors;
    return (
        <ul class={'text-gray-11 space-y-8 text-center'}>
            <For each={vendors()}>
                {(vendor, i) => (
                    <li class={''}>
                        <Button as={A} href={`/vendors/${vendor.id}`}>
                            <span class={'text-tomato-normal'}>{vendor.title}</span>
                            <span>{vendor.year}</span>
                            <span>{vendor.runtime}</span>
                        </Button>
                        <div class={'space-x-1'}>
                            <For each={vendor?.genres}>
                                {(genre) => (
                                    <span class={''}>{genre}</span>
                                )}
                            </For>
                        </div>
                    </li>
                )}
            </For>
        </ul>
    );
};

export default VendorsList;