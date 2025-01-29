import {AccessorWithLatest, createAsync} from "@solidjs/router";
import {VendorsData} from "~/lib/store";
import {createEffect} from "solid-js";
import {getVendors} from "~/lib/vendors";
import CategoryLayout from "~/components/layouts/category-layout";
import VendorsList from "~/components/vendors/list";


export const route = {
    preload() {
        getVendors();
    }
}

export default function Vendors() {

    const vendorsData: AccessorWithLatest<VendorsData | undefined> = createAsync(async () => getVendors());

    createEffect(() => {
        console.log("vendors", vendorsData())
    })
    return (
            <CategoryLayout {...vendorsData()}>
                <VendorsList vendors={vendorsData()}/>
            </CategoryLayout>
    );
}
