import {Component, For} from "solid-js";
import {ContentsData} from "~/lib/store";
import {A} from "@solidjs/router";
import {Button} from "~/components/ui/button";
import {baseApi} from "~/lib";

type PROPS = {
    contents: ContentsData | undefined;
}
/* TODO: NEED TO SETUP STATIC FILE SERVER ON GO PROJECT */
const ContentsList: Component<PROPS> = props => {
    const contents = () => props.contents?.contents;
    return (
        <ul class={'text-gray-11 space-y-8 text-center'}>
            <For each={contents()}>
                {(content, i) => (
                    <li class={''}>
                        <Button as={A} href={`/contents/${content.id}`}>
                            <img src={`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/${content?.src}`} class={'w-full h-full'} alt={''} />
                        </Button>

                    </li>
                )}
            </For>
        </ul>
    );
};

export default ContentsList;