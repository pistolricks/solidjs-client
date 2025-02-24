import {Component, For} from "solid-js";
import {VendorsData} from "~/lib/store";
import ListWrapper from "~/components/layouts/partials/list-wrapper";
import VendorCard from "~/components/vendors/partials/vendor-card";

type PROPS = {
    vendors: VendorsData | undefined;
}

const VendorsList: Component<PROPS> = props => {
    const vendors = () => props.vendors?.vendors;
    return (
        <ListWrapper>
            <For each={vendors()}>
                {(vendor, i) => (
                    <VendorCard {...vendor}/>
                )}
            </For>
        </ListWrapper>
    );
};

export default VendorsList;