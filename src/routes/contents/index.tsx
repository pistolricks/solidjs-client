import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {ContentsData} from "~/lib/store";
import {createEffect, lazy} from "solid-js";
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

    createEffect(() => {
        console.log("contents", contentsData())
    })
    return (
        <CategoryLayout {...contentsData()}>
            <A class={'text-gray-7'} href={"/contents/create"}>
                Create
            </A>
            <ContentsList contents={contentsData()}/>
        </CategoryLayout>
    );
}
