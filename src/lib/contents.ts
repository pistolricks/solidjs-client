import {action} from "@solidjs/router";
import {AUTHENTICATION_TOKEN, storage} from "~/lib/store";
import {redirectTo} from "~/lib/users";


export const uploadFileHandler = (async (data: FormDataEntryValue[]) => {
    "use server";

    let token = ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

    console.log("Bearer:", token.token)
    console.log("data", data[0])

    const vendorInput = {
        name:   String("test image"),
        src: String(data),
        type:   "image/jpeg",
        size:  String(400),
        width: String(400),
        height: String(400),
        sort_order: String(1),
    }

    console.log("vendorInput", vendorInput)

    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/upload/image`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(vendorInput)
    })

    const res: any = await response.json();
    const status: number = response.status;
    console.log("full json response", status)

    if (status === 201) {
        redirectTo("vendors")
    }
    return res;
})