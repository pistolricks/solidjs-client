import {Component, createMemo, For, Show} from "solid-js";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "~/components/ui/breadcrumb";


type PROPS = {
    path?: string;
}

const Breadcrumbs: Component<PROPS> = props => {

    const path = () => props.path ?? "";


    const splitPath = createMemo(() => {
        let s = path()?.replace(import.meta.env.VITE_DEV_DOMAIN, "")
        let split = s?.split("/")
        console.log(split)
        return split
    })


    return (
        <Show when={splitPath()?.length > 0 && splitPath()?.[1]?.length > 0}>
            <div class={'flex justify-between items-center w-full py-3 px-0.5 text-gray-normal'}>
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
        </Show>
    );
};

export default Breadcrumbs;