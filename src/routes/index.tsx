import {A, AccessorWithLatest} from "@solidjs/router";
import UserList from "~/components/users/list";
import {AUTHENTICATION_TOKEN, USER} from "~/lib/store";

import { createAsync } from "@solidjs/router";
import {getStorageUsers, getUserToken} from "~/lib/users";
import {createEffect} from "solid-js";



export const route = {
    preload(){
        // getStorageUsers();
    }
}

export default function Home() {
    
   // const users: AccessorWithLatest<USER[]|undefined> = createAsync(async () => getStorageUsers());

    const token: AccessorWithLatest<AUTHENTICATION_TOKEN|undefined> = createAsync(async () => getUserToken());

    createEffect(() => console.log("auth on index", token()))
    return (
        <main class="text-center mx-auto p-4">
            <h1 class="max-6-xs text-6xl text-red-7 font-thin uppercase my-16">
                SS FE - {token()?.token}
            </h1>

            <A class={"mt-4 w-full h-24 text-red-7"} href={"/register"}>Register</A>
        </main>
    );
}
