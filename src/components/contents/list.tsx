import {Component, createEffect, createSignal, For} from "solid-js";
import {ContentsData} from "~/lib/store";
import {ByteWithLocale} from "~/components/ui/format-byte";

type PROPS = {
    contents: ContentsData | undefined;
}
/* TODO: NEED TO SETUP STATIC FILE SERVER ON GO PROJECT */
const ContentsList: Component<PROPS> = props => {
    const contents = () => props.contents;

    const [getContents, setContents] = createSignal(contents()?.contents)

    createEffect(() => {
        setContents(() => contents()?.contents)
        console.log(contents())
        console.log(getContents())
    })

    return (
        <ul role="list"
            class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 container">
            <For each={getContents()}>
                {(content, i) => (
                    <li class="relative">
                        <div
                            class="group overflow-hidden rounded-lg h-3/4 focus-within:ring-2 focus-within:ring-blue-5 focus-within:ring-offset-2 focus-within:ring-offset-gray-1">
                            <img
                                src={`http://localhost:4000/${content.src}`}
                                alt="" class="pointer-events-none aspect-[7/7] object-cover group-hover:opacity-75"/>
                            <button type="button" class="absolute inset-0 focus:outline-none">
                                <span class="sr-only">{content.original}</span>
                            </button>
                        </div>
                        <p class="pointer-events-none mt-3 block truncate text-sm font-medium text-gray-11">{content.original}</p>
                        <div class={'flex justify-between items-center text-accent'}>
                            <span class={'text-xs py-1'}>{content.type}</span>
                            <ByteWithLocale value={content.size}/>
                        </div>
                    </li>
                )}
            </For>
        </ul>
    );
};

export default ContentsList;