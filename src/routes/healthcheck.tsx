import {A, AccessorWithLatest, createAsync} from "@solidjs/router";
import {USER}                               from "~/lib/store";
import {getStorageUsers}                    from "~/lib/users";
import {getHealth}                          from "~/lib/health";

export const route = {
    preload(){
        getHealth();
    }
}


export default function Healthcheck() {

    const healthcheck: any = createAsync(async () => getHealth())
    
    const check = () => healthcheck();
    console.log(check())
    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">About Page</h1>

            <p class="mt-8">
                Visit{" "}
                <a href="https://solidjs.com" target="_blank" class="text-sky-600 hover:underline">
                    solidjs.com
                </a>{" "}
                to learn how to build Solid apps.
            </p>
            <p class="my-4">
                <A href="/" class="text-sky-600 hover:underline">
                    Home
                </A>
                {" - "}
                <span>About Page</span>
            </p>
        </main>
    );
}
