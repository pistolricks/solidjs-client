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
import {MagnifyingGlass, MapPin} from "~/components/svg";
import MiniFormLayout from "~/components/layouts/mini-form-layout";
import AddressSearchForm from "~/components/addresses/forms/address-search-form";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));


export const route = {
    preload() {
        getAddresses();
        getAddressFormFormats();
    }
}

export default function Vendors() {
    const addressData: AccessorWithLatest<any | undefined> = createAsync(async () => getAddresses());

    createEffect(() => {
        console.log("addresses", addressData())
    })
    return (
        <CategoryLayout {...addressData()}>

            <AddressesList addresses={addressData()}/>

            <FooterMenu sectionClass={'flex justify-center items-center md:justify-between'} childClass={'w-full md:w-1/2 pl-2'} size="icon" titleClass={"bg-sky-4"} title={<MapPin class={'stroke-green-11'}/>}>
                <AddressSearchForm/>
            </FooterMenu>
        </CategoryLayout>
    );
}
