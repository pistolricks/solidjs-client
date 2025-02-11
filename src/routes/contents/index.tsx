import {AccessorWithLatest, createAsync} from "@solidjs/router";
import {ContentsData} from "~/lib/store";
import {createEffect, createSignal, lazy} from "solid-js";
import {getContents} from "~/lib/contents";
import FooterMenu from "~/components/layouts/partials/footer-menu";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));
const ContentsList = lazy(() => import( "~/components/contents/list"));



export default function Contents() {

    const contentsData: AccessorWithLatest<ContentsData | undefined> = createAsync(async () => getContents());

    const [getAllContents, setAllContents] = createSignal<ContentsData | undefined>(contentsData())
    createEffect(() => {

        setAllContents(() => contentsData())
        console.log("contents", contentsData())
        console.log("getAllContents", getAllContents())
    })
    return (
        <div class={'relative h-full w-full container'}>
            <CategoryLayout {...getAllContents()}>
                <ContentsList contents={getAllContents()}/>
            </CategoryLayout>

            <div class={'absolute bottom-0 w-full'}>
            <FooterMenu />
            </div>
        </div>
    );
}

