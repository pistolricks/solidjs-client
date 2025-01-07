import {A, AccessorWithLatest} from "@solidjs/router";
import {createSignal}          from "solid-js";
import UserList from "~/components/users/list";
import {USER}   from "~/lib/store";

import { createAsync } from "@solidjs/router";
import {getStorageUsers} from "~/lib/users";

export const route = {
    preload(){
        getStorageUsers();
    }
}

export default function Home() {
    
    const users: AccessorWithLatest<USER[]|undefined> = createAsync(async () => getStorageUsers());
    

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
