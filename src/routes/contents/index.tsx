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
import BaseDialog from "~/components/ui/dialogs/base-dialog";
import {BuildingOffice2, Photo, Plus, UploadCloud} from "~/components/svg";
import Drawer from "@corvu/drawer";

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

            <ContentsList contents={getAllContents()}/>

            <BaseDialog contextId={'albd1'}>
            <Dialog.Content contextId={'albd1'} >
                <FileUploader/>
            </Dialog.Content>

                <FooterMenu title={<BuildingOffice2 class={'size-full stroke-blue-11 p-0.5 fill-green-2'}/>} variant={'ghost'} size={'icon'}>
                    <Button  as={Drawer.Trigger} contextId={"albd1"} variant={"ghost"} size={'icon'}>
                        <Plus class={'size-full p-0.5 stroke-slate-11'}/>
                    </Button>
                </FooterMenu>
            </BaseDialog>
        </CategoryLayout>
    );
}

