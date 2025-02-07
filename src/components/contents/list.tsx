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
                            <img src={`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${content?.src}`} class={'w-full h-full'} alt={''} />
                        </Button>

                    </li>
                )}
            </For>
            http://localhost:4000/static/RM9BlkLOAr/
            <img src={`http://localhost:4000/static/RM9BlkLOAr/img_20150218_213534387-1738965046.jpg`} class={'w-full h-full'} alt={''} />
        </ul>
    );
};

export default ContentsList;