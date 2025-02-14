import {action, redirect} from "@solidjs/router";
import {baseApi, getUserToken} from "~/lib/server";


export const  createPositionMapHandler= async (mapInput: { title: string, filename: string, lat: number, lng: number }) => {
    "use server";
    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)

    const mapInputs = {
        title: `Lat: ${mapInput.lat} Lng: ${mapInput.lng} TC: ${Date.now()}`, // mapInput.title,
        filename: mapInput.filename,
        lat: mapInput.lat,
        lng: mapInput.lng,
    }

    console.log("mapInputs", mapInputs)

    const response = await fetch(`${baseApi}/maps/position`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(mapInputs)
    })

    const res: any = await response.json();
    const status: number = response.status;
    console.log("status", status)
    console.log("res", res)



    return res;
}