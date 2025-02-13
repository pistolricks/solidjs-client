import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {CountryData, VendorsData} from "~/lib/store";
import {createEffect, lazy, Show} from "solid-js";
import {getVendors} from "~/lib/vendors";
import {getAddresses, getAddressFormFormats} from "~/lib/addresses";
import AddressesList from "~/components/addresses/list";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import {Button} from "~/components/ui/button";
import Drawer from "@corvu/drawer";
import SideNavMenu from "~/components/layouts/partials/side-nav-menu";
import CreateAddressForm from "~/components/addresses/forms/create-address-form";
import {ResponsiveDialog} from "~/components/ui/responsive-dialog";
import {SideDrawer} from "~/components/ui/side-drawer";
import {ResponsiveDrawer} from "~/components/ui/responsive-drawer";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));
const FormLayout = lazy(() => import( "~/components/layouts/form-layout"));


export const route = {
    preload() {
        getAddresses();
        getAddressFormFormats();
    }
}

export default function Vendors() {
    const formFormats: AccessorWithLatest<CountryData | undefined> = createAsync(async () => getAddressFormFormats());
    const addressData: AccessorWithLatest<any | undefined> = createAsync(async () => getAddresses());

    createEffect(() => {
        console.log("addresses", addressData())
    })
    return (
        <CategoryLayout {...addressData()}>

            <AddressesList addresses={addressData()}/>

            <SideDrawer/>
            <ResponsiveDialog/>

            <ResponsiveDrawer/>
            <FooterMenu title={"Addresses"}>
                <Button as={A} href={'/addresses/create'} class={'uppercase bg-white'} variant={"outline"}
                        size={'sm'}>Create</Button>
            </FooterMenu>
            <Drawer.Content class={"w-screen sm:max-w-lg"}>
                <Show when={formFormats()}>
                    <CreateAddressForm {...formFormats()}/>
                </Show>
            </Drawer.Content>
        </CategoryLayout>
    );
}
