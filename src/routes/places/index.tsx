import {AccessorWithLatest, createAsync, useSubmission} from "@solidjs/router";
import {createEffect, createMemo, createSignal, lazy} from "solid-js";
import {actionPositionHandler, addressSearchHandler, getAddresses} from "~/lib/addresses";
import FooterMenu from "~/components/layouts/partials/footer-menu";

import SearchForm from "~/components/ui/search-form";
import {LookupResult, OsmOutput} from "~/lib/store";
import {MapIcon} from "~/components/svg";
import GeoMap from "~/components/addresses/partials/geo-map";
import {useLayoutContext} from "~/context/layout-provider";
import {ResponsiveDrawer} from "~/components/ui/dialogs/responsive-drawer";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));


export const route = {
    preload() {
        getAddresses();
    }
}

export default function Addresses() {
    const {setMyLocation, setStoreCollection, getStoreCollection} = useLayoutContext();
    const addressData: AccessorWithLatest<any | undefined> = createAsync(async () => getAddresses());

    const submission = useSubmission(addressSearchHandler);
    const currentPosition = useSubmission(actionPositionHandler);

    const [getPlace, setPlace] = createSignal<OsmOutput | undefined>()
    const [getDetails, setDetails] = createSignal<LookupResult | undefined>()

    const results = createMemo(() => {
        console.log("result2", submission.result)
        setStoreCollection(submission.result?.results)
        return submission.result?.results;
    })


    createEffect(() => {
        console.log("getDetails", getDetails())
        console.log("getPlace", getPlace())
        console.log("results_index", results())
        console.log("addresses", addressData())

        console.log("currentPosition", currentPosition.result?.results)

        setMyLocation(currentPosition.result?.results)
    })


    return (
        <ResponsiveDrawer contextId={'map1'}>
            <GeoMap featureCollection={getStoreCollection}/>
            <FooterMenu childClass={'w-full sm:max-w-sm'}
                        sectionClass={'flex justify-between items-center w-full space-x-4'}
                        title={<MapIcon class={'size-full stroke-mint-11 p-0.5 fill-green-2'}/>}
                        variant={'ghost'} size={'icon'}>
                <SearchForm contextId={'map1'} class={'w-full sm:max-w-sm'}/>
            </FooterMenu>
        </ResponsiveDrawer>
    );
}
