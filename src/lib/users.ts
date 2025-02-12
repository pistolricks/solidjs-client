import {storage} from "~/lib/store";
import {action, query, redirect} from "@solidjs/router";
import {baseApi, login,} from "~/lib/server";
import {redirectTo} from "~/lib/index";
import {getSessionUser, SessionUser, updateSessionUser} from "~/lib/session";
import {USER} from "~/lib/db";

export const getUser = query(async () => {
    "use server";
    console.log("getUser was called")
    let userData = (await getSessionUser()) as USER;
    if (userData?.email === "") {
        return undefined;
    } else {
        return userData
    }
}, "user")



export const registerUserHandler = action(async (data: FormData) => {
    "use server";

    const userInput = {
        name: String(data.get("firstName")) + " " + String(data.get("lastName")),
        email: String(data.get("email")),
        password: String(data.get("password")),
    }

    const response = await fetch(`${baseApi}/users`, {
        method: "POST",
        headers: {},
        body: JSON.stringify(userInput)
    })
    const res: any = await response.json();
    const status: number = response.status;
    console.log("full json response", status)

    if (status === 201) {
        redirectTo("activate")
    }
    return res;
})


export const loginUserHandler = action(async (data: FormData) => {
    "use server";

    const userInput = {
        email: String(data.get("email")),
        password: String(data.get("password")),
    }

    let res = await login(userInput)

    await updateSessionUser(res.user, res.authentication_token)

    const status: number = res.status;
    console.log("full json response", status)

    return res;
})

export const logoutUserHandler = action(async (data: FormData) => {
    "use server";

   const response = await fetch(`${baseApi}/users/logout`, {
        method: "POST",
    })

    const res: any = await response.json();
    const status: number = response.status;
    console.log("full json status", status)
    console.log("full json response", res)

    if (status === 200) {
        redirectTo()
    }
    return res;
})

export const activateUserHandler = async (token: string) => {
    "use server";

    const activateInput = {
        token: token,
    }

    console.log("activateInput", activateInput, token)

    const response = await fetch(`${baseApi}/users/activated`, {
        method: "PUT",
        headers: {},
        body: JSON.stringify(activateInput)
    })

    const res: any = await response.json();

    console.log("full json response", res)

    let user = await res.user;
    console.log("user ()", user)

    const status: number = response.status;
    console.log("full json response", status)


    return res;
}

export const resendActivateEmailHandler = action(async (data: FormData) => {
    "use server";

    const resendInput = {
        email: String(data.get("email")),
    }

    const response = await fetch(`${baseApi}/tokens/activation`, {
        method: "POST",
        headers: {},
        body: JSON.stringify(resendInput)
    })

    const res: any = await response.json();

    console.log("full json response", res)


    const status: number = response.status;
    console.log("full json response", status)


    if (status === 200) {
        redirectTo()
    }
    return res;
})

