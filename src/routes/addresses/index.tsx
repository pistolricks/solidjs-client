import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {CountryData} from "~/lib/store";
import {createEffect, lazy, Show} from "solid-js";
import {getAddresses, getAddressFormFormats} from "~/lib/addresses";
import AddressesList from "~/components/addresses/list";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import {Button} from "~/components/ui/button";
import {DrawerContent, DrawerTrigger} from "~/components/ui/drawer";
import CreateAddressForm from "~/components/addresses/forms/create-address-form";
import FormLayout from "~/components/layouts/form-layout";
import {MagnifyingGlass} from "~/components/svg";
import MiniFormLayout from "~/components/layouts/mini-form-layout";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));


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


            <DrawerContent class={"relative h-full"}>
                <MiniFormLayout title="Address Search">
                    <Show when={formFormats()}>
                        <CreateAddressForm {...formFormats()}/>
                    </Show>
                </MiniFormLayout>
            </DrawerContent>

            <FooterMenu title={"Addresses"}>
                <DrawerTrigger as={Button<"button">} class={'uppercase bg-white'} size={"icon"} variant={"outline"}>
                    <MagnifyingGlass/>
                </DrawerTrigger>
            </FooterMenu>
        </CategoryLayout>
    );
}
