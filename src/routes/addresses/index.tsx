import {AccessorWithLatest, createAsync, useSubmission} from "@solidjs/router";
import {createEffect, createMemo, createSignal, For, lazy} from "solid-js";
import {actionPositionHandler, addressPositionHandler, addressSearchHandler, getAddresses} from "~/lib/addresses";
import AddressesList from "~/components/addresses/list";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import {MapPin} from "~/components/svg";
import AddressSearchForm from "~/components/addresses/forms/address-search-form";
import {DrawerContent, DrawerTrigger} from "~/components/ui/drawer";
import {Button} from "~/components/ui/button";
import {LookupResult, OsmOutput} from "~/lib/store";
import Geolocation from "~/components/ui/geolocation";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));


export const route = {
    preload() {
        getAddresses();
    }
}

export default function Addresses() {
    const addressData: AccessorWithLatest<any | undefined> = createAsync(async () => getAddresses());
    const submission = useSubmission(addressSearchHandler);

    const currentPosition = useSubmission(actionPositionHandler);

    const [getPlace, setPlace] = createSignal<OsmOutput | undefined>()
    const [getDetails, setDetails] = createSignal<LookupResult | undefined>()

    const results = createMemo(() => {
        console.log("result2", submission.result)
        return submission.result;
    })


    createEffect(() => {
        console.log("getDetails", getDetails())
        console.log("getPlace", getPlace())
        console.log("results_index", results()?.results)
        console.log("addresses", addressData())

        console.log("currentPosition", currentPosition.result)


    })

    const selectPlace = (data: OsmOutput, event: Event) => {
        console.log("Data:", data, "Event:", event);
        setPlace(data)
    };


    const handleGetDetails = async (data: OsmOutput, event: Event) => {
        if (!data) return;
        // let res = await addressDetailsHandler(data.place_id)
        let res = await addressPositionHandler(data.lat, data.lon)
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
            <CategoryLayout {...addressData()}>
                <DrawerContent class={"relative h-full overflow-y-auto"}>
                    <pre>{JSON.stringify(details(), null, 2)}</pre>
                </DrawerContent>


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
                            title={<Geolocation/>}>


                    <AddressSearchForm/>
                </FooterMenu>
            </CategoryLayout>
        </div>
    );
}
