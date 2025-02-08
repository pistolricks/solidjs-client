import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {ContentsData} from "~/lib/store";
import {createEffect, createSignal, lazy} from "solid-js";
import {getContents} from "~/lib/contents";
const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));
const ContentsList = lazy(() => import( "~/components/contents/list"));


export const route = {
    preload() {
        getContents();
    }
}

export default function Contents() {

    const contentsData: AccessorWithLatest<ContentsData | undefined> = createAsync(async () => getContents());

    const [getAllContents, setAllContents] = createSignal<ContentsData | undefined>(contentsData())
    createEffect(() => {

        setAllContents(() => contentsData())
        console.log("contents", contentsData())
        console.log("getAllContents", getAllContents())
    })
    return (
        <CategoryLayout {...getAllContents()}>
            <A class={'text-gray-7'} href={"/contents/upload"}>
                Create
            </A>
            <ContentsList contents={getAllContents()}/>
        </CategoryLayout>
    );
}
