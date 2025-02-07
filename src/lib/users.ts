import {AUTHENTICATION_TOKEN, storage, USER} from "~/lib/store";
import {action, query, redirect} from "@solidjs/router";
import {showToast} from "~/components/ui/toast";
import {
    baseApi,
    getSession,
    logout as logoutSession,
} from "~/lib/server";
import {db} from "~/lib/db";

export const getStorageUsers = query(async () => {
    "use server";
    console.log("getStorageUsers was called")
    return [];
}, "users")

export const getUserA = query(async () => {
    "use server";
    try {
        const session = await getSession();
        const userId = session.data.userId;
        if (userId === undefined) throw new Error("User not found");
        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        return { id: user.id, email: user.email };
    } catch {
        await logoutSession();
        throw redirect("/login");
    }
}, "user");

export const getUser = query(async () => {
    "use server";
    console.log("getUser was called")
    let userData = (await storage.getItem("user:data")) as USER;
    if (userData?.email === "") {
        return undefined;
    } else {
        return userData
    }
}, "user")

export const redirectTo = (path?: string) => {
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

    const response = await fetch(`${baseApi}/tokens/authentication`, {
        method: "POST",
        body: JSON.stringify(userInput)
    })

    const res: any = await response.json();

    console.log("full json response", res)

    await storage.setItem("auth:token", {
        token: res.authentication_token.token,
        expiry: res.authentication_token.expiry,
    })

    await storage.setItem("user:data", {
        id: res.user?.id,
        name: res.user?.name,
        email: res.user?.email,
        activated: res.user?.activated,
        created_at: res.user?.created_at,
    })

    try {

        const session = await getSession();
        await session.update(d => {
            d.userId = res.user?.id;
        });

    } catch (err) {
        return err as Error;
    }

    console.log("user", res?.user);
    console.log(res.authentication_token.token);

    const status: number = response.status;
    console.log("full json response", status)

    if (status === 201) {
        if (!res.user.activated) throw redirect("/activate");
        if(res.user.activated) {
            redirectTo()
        }
    }
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

    await storage.setItem("auth:token", {
        token: undefined,
        expiry: undefined,
    })

    await storage.setItem("user:data", {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        activated: res.user.activated,
        created_at: res.user.created_at,
    })

    await logoutSession();


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

export const getUserToken = query(async () => {
    "use server";

    console.log("getUserToken")
    return ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

}, 'token')