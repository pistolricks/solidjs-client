import {AccessorWithLatest, createAsync, useSubmission} from "@solidjs/router";
import {createEffect, createMemo, createSignal, For, lazy} from "solid-js";
import {actionPositionHandler, addressSearchHandler, getAddresses} from "~/lib/addresses";
import AddressesList from "~/components/addresses/list";
import FooterMenu from "~/components/layouts/partials/footer-menu";

import AddressSearchForm from "~/components/addresses/forms/address-search-form";
import {Button} from "~/components/ui/button";
import {LookupResult, OsmOutput} from "~/lib/store";
import Geolocation from "~/components/addresses/partials/geolocation";
import DrawerPrimitive from "@corvu/drawer";
import {MapIcon} from "~/components/svg";
import GeoMap from "~/components/addresses/partials/geo-map";
import ListWrapper from "~/components/layouts/partials/list-wrapper";
import {useLayoutContext} from "~/context/layout-provider";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));


export const route = {
    preload() {
        getAddresses();
    }
}

export default function Addresses() {
    const {setMyLocation, getMyLocation} = useLayoutContext();
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

        console.log("currentPosition", currentPosition.result?.results)

        setMyLocation(currentPosition.result?.results)


    })

    const handleGetDetails = async (data: OsmOutput, event: Event) => {
        if (!data) return;
        setDetails(data)
    }


    const details = createMemo(() => {
        console.log("getDetails", getDetails())
        return getDetails()
    })


    return (
        <div>
            <CategoryLayout {...addressData()}>
                <DrawerPrimitive.Content contextId={'rmd1'} class={"relative h-full overflow-y-auto"}>
                    <pre>{JSON.stringify(details(), null, 2)}</pre>
                </DrawerPrimitive.Content>


                <GeoMap/>

                <ListWrapper>
                    <For each={results()?.results}>
                        {(place) => (

                            <DrawerPrimitive.Trigger contextId={'rmd1'} as={Button<"button">}
                                                     onClick={[handleGetDetails, place]} class={'bg-gray-1'}>
                                <p>{place.osm_id}</p>
                                <p>{place.osm_type}</p>
                                <p>{place.display_name}</p>
                            </DrawerPrimitive.Trigger>
                        )}
                    </For>
                </ListWrapper>
                <AddressesList addresses={addressData()}/>

            </CategoryLayout>


            <FooterMenu childClass={'w-full'} sectionClass={'flex justify-between items-center w-full space-x-4'}
                        title={<MapIcon class={'size-full stroke-mint-11 p-0.5 fill-green-2'}/>}
                        variant={'ghost'} size={'icon'}>
                <AddressSearchForm/>
            </FooterMenu>
        </div>
    );
}
