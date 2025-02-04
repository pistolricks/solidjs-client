import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {VendorsData} from "~/lib/store";
import {createEffect, lazy} from "solid-js";
import {getVendors} from "~/lib/vendors";
const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));
const VendorsList = lazy(() => import( "~/components/vendors/list"));


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
                <A class={'text-gray-7'} href={"/vendors/create"}>
                    Create
                </A>
                <VendorsList vendors={vendorsData()}/>
            </CategoryLayout>
    );
}
