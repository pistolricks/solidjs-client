import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {VendorsData} from "~/lib/store";
import {createEffect, lazy} from "solid-js";
import {getVendors} from "~/lib/vendors";
import FooterMenu from "~/components/layouts/partials/footer-menu";
import Dialog from "@corvu/dialog";
import {Button} from "~/components/ui/button";
import BaseDialog from "~/components/ui/dialogs/base-dialog";
import {BuildingOffice2, Plus} from "~/components/svg";
import Drawer from "@corvu/drawer";
import FormLayout from "~/components/layouts/form-layout";
import CreateVendorForm from "~/components/vendors/forms/create-vendor-form";

const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));
const VendorsList = lazy(() => import( "~/components/vendors/list"));


export const route = {
    preload() {
        getVendors();
    }
}

export default function Vendors() {

    const vendorsData: AccessorWithLatest<VendorsData | undefined> = createAsync(async () => getVendors());

    createEffect(() => {
        console.log("vendors", vendorsData())
    })
    return (
        <CategoryLayout {...vendorsData()}>

            <VendorsList vendors={vendorsData()}/>


            <BaseDialog contextId={'albd1'}>
                <Dialog.Content contextId={'albd1'} >
                    <FormLayout title="Add Vendor">
                        {/*
            <FileUploader/>
            */}
                        <CreateVendorForm/>
                    </FormLayout>
                </Dialog.Content>

                <FooterMenu title={<BuildingOffice2 class={'size-full stroke-bronze-11 p-0.5 fill-green-2'}/>} variant={'ghost'} size={'icon'}>
                    <Button  as={Drawer.Trigger} contextId={"albd1"} variant={"ghost"} size={'icon'}>
                        <Plus class={'size-full p-0.5 stroke-slate-11'}/>
                    </Button>
                </FooterMenu>
            </BaseDialog>
        </CategoryLayout>
    );
}
