import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {VendorsData} from "~/lib/store";
import {createEffect, lazy} from "solid-js";
import {getVendors} from "~/lib/vendors";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import Dialog from "@corvu/dialog";
import {Button} from "~/components/ui/button";
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
        <div class={'relative h-full w-full container'}>
            <CategoryLayout {...vendorsData()}>
                <VendorsList vendors={vendorsData()}/>
            </CategoryLayout>

            <FooterMenu title={"Vendors"}>
                <Button as={A} href={'/vendors/create'} class={'uppercase bg-white'} variant={"outline"} size={'sm'}>Create</Button>
            </FooterMenu>
        </div>
    );
}
