import {AccessorWithLatest, createAsync, RouteDefinition} from "@solidjs/router";
import {ContentsData} from "~/lib/store";
import {createEffect, createSignal, lazy} from "solid-js";
import {getContents} from "~/lib/contents";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import {Button} from "~/components/ui/button";
import Dialog from "@corvu/dialog";
import FileUploader from "~/components/ui/file-uploader";
import {getUser} from "~/lib/users";
import {DrawerContent} from "~/components/ui/drawer";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));
const ContentsList = lazy(() => import( "~/components/contents/list"));

export const route = {
    preload({params}){
        getContents();
    }
} satisfies RouteDefinition
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
            <Dialog.Content>
                <FileUploader/>
            </Dialog.Content>



            <ContentsList contents={getAllContents()}/>

            <FooterMenu title={"Contents"}>
                <Dialog.Trigger as={Button<"button">} class={'uppercase bg-white'} variant={"outline"}
                                size={'sm'}>Upload</Dialog.Trigger>
            </FooterMenu>
        </CategoryLayout>
    );
}

