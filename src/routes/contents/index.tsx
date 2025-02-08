import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {ContentsData} from "~/lib/store";
import {Component, createEffect, createSignal, lazy} from "solid-js";
import {getContents} from "~/lib/contents";
const CategoryLayout = lazy(() => import( "~/components/layouts/category-layout"));
const ContentsList = lazy(() => import( "~/components/contents/list"));
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "~/components/ui/breadcrumb"


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
            <Breadcrumb class={'flex justify-between items-center mb-4 sticky top-0'}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>

                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/contents">Contents</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink class={"text-blue-11 hover:text-blue-7"} href="/contents/upload">UPLOAD</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ContentsList contents={getAllContents()}/>
        </CategoryLayout>
    );
}

