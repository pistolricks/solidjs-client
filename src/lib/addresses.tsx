import {action} from "@solidjs/router";
import {AUTHENTICATION_TOKEN, storage} from "~/lib/store";
import {redirectTo} from "~/lib/users";


export const addAddress = action(async (data: FormData) => {
    "use server";

    let token = ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

    console.log("Bearer:", token.token)


    const addressInput = {
        street_address: String(data.get("street_address")),
        locality: String(data.get("locality")),
        administrative_area: String(data.get("administrative_area")),
        post_code: String(data.get("post_code")),
        country: "USA",
    }

    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/addresses`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(addressInput)
    })

    const res: any = await response.json();
    const status: number = response.status;
    console.log("full json response", status)

    if (status === 201) {
        redirectTo()
    }
    return res;
})