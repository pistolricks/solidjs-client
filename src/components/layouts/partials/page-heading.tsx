import {Component, createMemo, For, Show} from "solid-js";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "~/components/ui/breadcrumb";
import {A} from "@solidjs/router";
import {Button} from "~/components/ui/button";




type PROPS = {
    path: string;
}

const PageHeading: Component<PROPS> = props => {

    const path = () => props.path;



    const splitPath = createMemo(() => {
        let s = path()?.replace(import.meta.env.VITE_DEV_DOMAIN, "")
        let split = s?.split("/")
        console.log(split)
        return split
    })



    return (
        <div class={'flex justify-between items-center w-full py-3 px-1 text-gray-normal'}>
            <Breadcrumb class={''}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <For each={splitPath()}>
                        {(path, i) => (
                            <Show when={i() > 0 && path?.length > 0}>
                                <BreadcrumbSeparator>
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={`/${path}`} class={"capitalize"}>{path}</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Show>
                        )}
                    </For>


                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default PageHeading;