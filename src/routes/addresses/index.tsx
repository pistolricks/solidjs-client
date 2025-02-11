import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {VendorsData} from "~/lib/store";
import {createEffect, lazy} from "solid-js";
import {getVendors} from "~/lib/vendors";
import {getAddresses} from "~/lib/addresses";
import AddressesList from "~/components/addresses/list";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import {Button} from "~/components/ui/button";
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
        <div class={'relative h-full w-full container'}>
            <CategoryLayout {...addressData()}>
                <AddressesList addresses={addressData()}/>
            </CategoryLayout>

            <FooterMenu title={"Addresses"}>
                <Button as={A} href={'/addresses/create'} class={'uppercase bg-white'} variant={"outline"} size={'sm'}>Create</Button>
            </FooterMenu>
        </div>
    );
}
