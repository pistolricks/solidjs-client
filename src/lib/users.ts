import {AUTHENTICATION_TOKEN, storage, USER} from "~/lib/store";
import {action, query, redirect} from "@solidjs/router";

export const getStorageUsers = query(async () => {
    "use server";
    console.log("getStorageUsers was called")
    return [];
}, "users")

export const getUser = query(async () => {
    "use server";
    console.log("getStorageUser was called")
    return ((await storage.getItem("user:data")) as USER);
}, "user")

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

    console.log("full json response", res)


    await storage.setItem("auth:token", {
        token: res.authentication_token.token,
        expiry: res.authentication_token.expiry,
    })

    await storage.setItem("user:data", {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        activated: res.user.activated,
        created_at: res.user.created_at,
    })


    console.log("user", res.user);
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