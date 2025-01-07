import {A}            from "@solidjs/router";
import {createSignal} from "solid-js";
import UserList from "~/components/users/list";
import {USER}   from "~/lib/store";

import { createAsync } from "@solidjs/router";


export default function Home() {
    
    const users = createAsync(async () => 
        await fetch(`http://localhost:${import.meta.env.VITE_CLIENT_PORT}/api/users`).then(res => res.json())
    )
    

    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
                SS FE
            </h1>
            <UserList users={users()}/>
            <A class={"mt-4 w-full h-24"} href={"/users/create"}>New User</A>
        </main>
    );
}
