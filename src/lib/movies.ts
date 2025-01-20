import {AUTHENTICATION_TOKEN, storage, USER} from "~/lib/store";
import {action, query, redirect} from "@solidjs/router";

export const getMovies = query(async () => {
    "use server";
    let token = ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

    console.log("calling token", token.token)

    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/movies`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
    })
    const res: any = await response.json();
    console.log(res);
    return res;
}, "movies")

export const getMovie = query(async (id: number) => {
    "use server";
    console.log("getMovie was called")
    return ((await storage.getItem("users:data")) as USER[]).find(
        user => user.id === id
    );
}, "user")

export type userInput = Pick<USER, "firstName" | "lastName" | "age">

export const addMovie = action(async (data: FormData) => {
    "use server";
    
    const userInput = {
        firstName: String(data.get("firstName")),
        lastName: String(data.get("lastName")),
        age: Number(data.get("age")),
    }
    
    let [{value: users}, {value: index}] = await storage.getItems([
        "users:data",
        "users:counter"
    ])

    let user;
    await Promise.all([
        storage.setItem("users:data", [
            ...(users as USER[]),
            (user = {
                ...userInput,
                id: index as number,
            }),
            storage.setItem("users:counter", (index as number) + 1)
        ])
    ])
    throw redirect("/")
})

const redirectTo = (path?: string) => {
    let urlPath = `/${path ?? ``}`
    throw redirect(urlPath) 
}

export const registerMovieHandler = action(async (data: FormData) => {
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
