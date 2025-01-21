import {AUTHENTICATION_TOKEN, storage, USER} from "~/lib/store";
import {action, query, redirect} from "@solidjs/router";

export const getMovies = query(async () => {
    "use server";
    let token = ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

    console.log("Bearer:", token.token)

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

    let token = ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

    console.log("Bearer:", token.token)

    console.log("getMovie was called")
    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/movies/${id}`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
    })
    const res: any = await response.json();
    console.log(res);
    return res;
}, "movie")


export const addMovie = action(async (data: FormData) => {
    "use server";

    let token = ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

    console.log("Bearer:", token.token)


    const movieInput = {
        title: String(data.get("title")),
        year: Number(data.get("year")),
        runtime: String(data.get("runtime")) + ' mins',
        genres: [String(data.get("genres"))],
    }

    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/movies`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(movieInput)
    })
    const res: any = await response.json();
    console.log(res);

    if (!res?.error) {
        redirectTo("movies")
    }
    return res;
})

const redirectTo = (path?: string) => {
    let urlPath = `/${path ?? ``}`
    throw redirect(urlPath) 
}