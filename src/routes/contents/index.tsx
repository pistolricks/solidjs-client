import {AccessorWithLatest, createAsync} from "@solidjs/router";
import {ContentsData} from "~/lib/store";
import {createEffect, createSignal, lazy} from "solid-js";
import {getContents} from "~/lib/contents";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import { Button } from "~/components/ui/button";
import Dialog from "@corvu/dialog";
import FileUploader from "~/components/ui/file-uploader";

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
            <Dialog.Content class="fixed left-1/2 top-1/2 z-50 min-w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-gray-normal bg-gray-ui px-6 py-5 data-open:animate-in data-open:fade-in-0% data-open:zoom-in-95% data-open:slide-in-from-top-10% data-closed:animate-out data-closed:fade-out-0% data-closed:zoom-out-95% data-closed:slide-out-to-top-10%">
               <FileUploader/>
            </Dialog.Content>

            <CategoryLayout {...getAllContents()}>
                <ContentsList contents={getAllContents()}/>
            </CategoryLayout>
            <FooterMenu title={"Contents"}>
                    <Dialog.Trigger as={Button} class={'uppercase bg-white'} variant={"outline"} size={'sm'}>Upload</Dialog.Trigger>
            </FooterMenu>
        </div>
    );
}

