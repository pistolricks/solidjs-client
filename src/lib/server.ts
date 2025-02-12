import {useSession} from "vinxi/http";
import {db} from "./db";
import {clearSessionUser, getSession, getSessionToken, updateSessionUser} from "~/lib/session";
import {query, redirect} from "@solidjs/router";
import {AUTHENTICATION_TOKEN, redirectTo} from "~/lib/index";

export const baseApi = (`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}`)

export async function register(userInput: { name: string, email: string, password: string }) {
    const res = await db.user.register({where: {userInput}});
    if (res.status === 201) throw redirect("/activate");
    else return res;
}

export async function activateUser(activateInput: { token: string }) {
    const res = await db.user.activate({where: {activateInput}});
    if (res.status === 201) throw redirect("/activate");
    else throw redirect("/");
}

export async function resendActivateEmail(resendInput: { email: string }) {
    const res = await db.user.resendActivateEmail({where: {resendInput}});
    if(res.status === 202) throw redirect("/activate");
    else return res;
}

export async function login(userInput: { email: string, password: string }) {
    const res = await db.user.login({where: {userInput}});
    await updateSessionUser(res.user, res.authentication_token)
    if (!res.user.activated) throw redirect("/activate");
    if(res.user.activated) throw redirect("/");
    else return res;

}

export async function logout() {
    await clearSessionUser();
    await db.user.logout();
    throw redirect("/");
}

export const getUserToken = query(async () => {
    console.log("getUserToken")
    return (await getSessionToken() as AUTHENTICATION_TOKEN);
}, 'token')

