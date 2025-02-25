import {Component, For, ParentProps} from "solid-js";
import {MenuItem} from "~/components/layouts/partials/side-nav-menu";
import {useLayoutContext} from "~/context/layout-provider";
import {A} from "@solidjs/router";

const Categories: Component<ParentProps> = props => {
    const {apps, getHeight} = useLayoutContext();

    return (
        <div
           style={{
               height: getHeight() + 'px'
           }}
            class={'container flex justify-center items-center relative'}>
            <ul class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 p-6 md:p-3 md:w-1/2 absolute top-1/2 -translate-y-1/2">
                <For each={apps}>
                    {(item) => (
                        <li class="relative h-full w-full border border-gray-300 rounded bg-white hover:text-emerald-500 hover:bg-emerald-50 focus:bg-emerald-50 aria-[current=page]:text-emerald-500 aria-[current=page]:bg-emerald-50">
                            <A href={`/${item.href}`}>
                                <img src={`/${item.href}.jpg`} class={'h-full w-full rounded border border-gray-500'}  alt={item.title}/>
                                <div class={'absolute flex justify-center items-center bottom-2 inset-x-0'}>
                                    <h3 class={'py-1 px-2 bg-white rounded uppercase border border-gray-400 text-xs'}>{item.title}</h3>
                                </div>
                            </A>
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
};

export default Categories;