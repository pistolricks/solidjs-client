import {AccessorWithLatest, createAsync, redirect, useSubmission} from "@solidjs/router";
import {createEffect, createMemo, createSignal, For, lazy, Show} from "solid-js";
import {addressDetailsHandler, addressSearchHandler, getAddresses} from "~/lib/addresses";
import AddressesList from "~/components/addresses/list";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import {MagnifyingGlass, MapPin} from "~/components/svg";
import AddressSearchForm from "~/components/addresses/forms/address-search-form";
import {DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import {LookupResult, OsmOutput} from "~/lib/store";
import {db} from "~/lib/db";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));


export const route = {
    preload() {
        getAddresses();
    }
}

export default function Addresses() {
    const addressData: AccessorWithLatest<any | undefined> = createAsync(async () => getAddresses());
    const submission = useSubmission(addressSearchHandler);

    const [getPlace, setPlace] = createSignal<OsmOutput | undefined>()
    const [getDetails, setDetails] = createSignal<LookupResult | undefined>()

    const results = createMemo(() => {
        console.log("result2", submission.result)
        return submission.result;
    })


    createEffect(() => {
        console.log("getPlace", getPlace())
        console.log("results_index", results()?.results)
        console.log("addresses", addressData())
    })

    const selectPlace = (data: OsmOutput, event: Event) => {
        console.log("Data:", data, "Event:", event);
        setPlace(data)
    };


    const handleGetDetails = async(data: OsmOutput, event: Event) => {
        if (!data) return;
        let res = await addressDetailsHandler(data.place_id)
        console.log('status', res.status)
        setDetails(res)
        return res;
    }


    const details = createMemo(() => {
        console.log("getDetails", getDetails())
        return getDetails()
    })


    return (
        <div>
            <DrawerContent class={"relative h-full"}>
                <pre>{JSON.stringify(details(), null, 2)}</pre>
            </DrawerContent>
        <CategoryLayout {...addressData()}>

            <For each={results()?.results}>
                {(place) => (

                    <DrawerTrigger as={Button<"button">} onClick={[handleGetDetails, place]} class={'bg-gray-1'}>
                        <p>{place.osm_id}</p>
                        <p>{place.osm_type}</p>
                        <p>{place.display_name}</p>
                    </DrawerTrigger>
                )}
            </For>


            <AddressesList addresses={addressData()}/>



            <FooterMenu sectionClass={'flex justify-center items-center md:justify-between'}
                        childClass={'w-full md:w-1/2 pl-2'} size="icon" titleClass={"bg-sky-4"}
                        title={<MapPin class={'stroke-green-11'}/>}>


                <AddressSearchForm/>
            </FooterMenu>
        </CategoryLayout>
        </div>
    );
}
