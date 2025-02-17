import {A, RouteSectionProps} from "@solidjs/router";
import {lazy} from "solid-js";

export default function About(props: RouteSectionProps) {
    return (
        <div class="text-center mx-auto text-gray-700 p-4">
            <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">About Page</h1>

            <p class="mt-8">
                Visit{" "}
                About
            </p>
            <p class="my-4">
                <A href="/" class="text-sky-600 hover:underline">
                    Home
                </A>
                {" - "}
                <span>About Page</span>
            </p>
        </div>
    );
}
