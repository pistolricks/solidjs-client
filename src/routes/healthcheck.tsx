import {A, createAsync} from "@solidjs/router";
import {getHealthcheck}      from "~/lib/healthcheck";

export const route = {
    preload() {
        getHealthcheck();
    }
}


export default function Healthcheck() {

    const healthcheck: any = createAsync(async () => getHealthcheck())

    const check = () => healthcheck();
    console.log(check())
    return (
        <main class="text-center mx-auto text-gray-7 p-4">
            <h1 class="max-6-xs text-6xl text-sky-7 font-thin uppercase my-16">Health Check</h1>
            <p class="mt-8 uppercase">
                {check()?.status} - {check()?.system_info?.environment} - {check()?.system_info?.version}
             </p>
        </main>
    );
}
