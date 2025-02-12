import {action, query} from "@solidjs/router";
import {activateUser, baseApi, login, logout, register, resendActivateEmail,} from "~/lib/server";
import {redirectTo} from "~/lib/index";
import {getSessionUser} from "~/lib/session";
import {USER} from "~/lib/db";

export const getUser = query(async () => {
    "use server";
    let userData = (await getSessionUser()) as USER|undefined;
    console.log("getUser", userData)
    return userData;
}, "user")

export const registerUserHandler = action(async (data: FormData) => {
    "use server";
    const userInput = {
        name: String(data.get("firstName")) + " " + String(data.get("lastName")),
        email: String(data.get("email")),
        password: String(data.get("password")),
    }
    return await register(userInput)
})

export const activateUserHandler = async (token: string) => {
    "use server";
    const activateInput = {
        token: token,
    }
    return activateUser(activateInput)
}

export const resendActivateEmailHandler = action(async (data: FormData) => {
    "use server";
    const resendInput = {
        email: String(data.get("email")),
    }
   return resendActivateEmail(resendInput)
})

export const loginUserHandler = action(async (data: FormData) => {
    "use server";
    const userInput = {
        email: String(data.get("email")),
        password: String(data.get("password")),
    }
    return await login(userInput)
})

export const logoutUserHandler = action(async () => {
    "use server";
    return await logout()
})