import {Component} from "solid-js";

type PROPS = {
    title: string
}

const FooterMenu: Component<PROPS> = props => {

    const title = () => props.title ?? "Menu";

    return (
        <div class="md:flex md:items-center md:justify-between">
            <div class="min-w-0 flex-1">
                <h2 class="text-2xl/7  text-gray-11 sm:truncate sm:text-3xl sm:tracking-tight">{title()}</h2>
            </div>
            <div class="">
                <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Upload
                </button>
            </div>
        </div>
    );
};

export default FooterMenu;