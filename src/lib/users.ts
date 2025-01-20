import {AUTHENTICATION_TOKEN, storage, USER} from "~/lib/store";
import {action, query, redirect} from "@solidjs/router";

export const getStorageUsers = query(async () => {
    "use server";
    console.log("getStorageUsers was called")
    return ((await storage.getItem("users:data")) as USER[]).reverse();
}, "users")

export const getUser = query(async (id: number) => {
    "use server";
    console.log("getUser was called")
    return (await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/users`)).json();
}, "user")

export type userInput = Pick<USER, "firstName" | "lastName" | "age">


const redirectTo = (path?: string) => {
    let urlPath = `/${path ?? ``}`
    throw redirect(urlPath) 
}

export const registerUserHandler = action(async (data: FormData) => {
    "use server";

    const userInput = {
        name: String(data.get("firstName")) + " " + String(data.get("lastName")),
        email: String(data.get("email")),
        password: String(data.get("password")),
    }

    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/users`, {
        method: "POST",
        headers: {},
        body: JSON.stringify(userInput)
    })
    const res: any = await response.json();
    console.log(res);

    if (!res?.error) {
        redirectTo()    
    }
    return res;
})


export const loginUserHandler = action(async (data: FormData) => {
    "use server";

    const userInput = {
        email: String(data.get("email")),
        password: String(data.get("password")),
    }

    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/tokens/authentication`, {
        method: "POST",
        headers: {},
        body: JSON.stringify(userInput)
    })

    const res: any = await response.json();


    await storage.setItem("auth:token", {
        token: res.authentication_token.token,
        expiry: res.authentication_token.expiry,
    })

    console.log(res.authentication_token.token);


    if (!res?.error) {
        redirectTo()
    }
    return res;
})

export const getUserToken = query(async () => {
    "use server";

    console.log("getUserToken")
    return ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

}, 'token')