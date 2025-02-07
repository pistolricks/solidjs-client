import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {VendorsData} from "~/lib/store";
import {createEffect, lazy} from "solid-js";
import {getVendors} from "~/lib/vendors";
import {getAddresses} from "~/lib/addresses";
import AddressesList from "~/components/addresses/list";
const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));
const VendorsList = lazy(() => import( "~/components/vendors/list"));


export const route = {
    preload() {
        getAddresses();
    }
}

export default function Vendors() {

    const addressData: AccessorWithLatest<any | undefined> = createAsync(async () => getAddresses());

    createEffect(() => {
        console.log("addresses", addressData())
    })
    return (
        <CategoryLayout {...addressData()}>
            <A class={'text-gray-7'} href={"/addresses/create"}>
                Create
            </A>
            <AddressesList addresses={addressData()}/>
        </CategoryLayout>
    );
}
