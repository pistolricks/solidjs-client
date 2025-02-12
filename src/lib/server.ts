import {useSession} from "vinxi/http";
import {db} from "./db";
import {clearSessionUser, getSession, getSessionToken} from "~/lib/session";
import {query, redirect} from "@solidjs/router";
import {AUTHENTICATION_TOKEN, redirectTo} from "~/lib/index";

export const baseApi = (`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}`)


export async function login(userInput: { email: string, password: string }) {
    const res = await db.user.login({ where: { userInput } } );
    console.log(res.user);

    if (res.status === 201) {
        if (!res.user.activated) throw redirect("/activate");
        if (res.user.activated) {
            redirectTo()
        }
    }
    return res;
}

export async function logout() {
    await clearSessionUser();
}


export const getUserToken = query(async () => {
    console.log("getUserToken")
    return (await getSessionToken() as AUTHENTICATION_TOKEN);
}, 'token')

