import {action} from "@solidjs/router";
import {AUTHENTICATION_TOKEN, storage} from "~/lib/store";
import {redirectTo} from "~/lib/users";
import {createSignal} from "solid-js";


export const uploadFileHandler = (async (data: FormDataEntryValue[]) => {
    "use server";

    let token = ((await storage.getItem("auth:token")) as AUTHENTICATION_TOKEN);

    console.log("Bearer:", token.token)
    console.log("data", data[0])
    const [getFile, setFile] = createSignal<any>(data[0])

    const vendorInput = {
        name:   getFile()?.name,
        src: getFile(),
        type:   getFile()?.type,
        size:  getFile()?.size,
    }

    const formData  = new FormData();
    if(vendorInput.src) {
        formData.append("file", vendorInput.src);
        formData.append("name", vendorInput.name);
        formData.append("size", vendorInput.size);
        formData.append("type", vendorInput.type);
    }

    console.log("vendorInput", vendorInput)

    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/upload/image`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`,
        },
        body: formData
    })

    const res: Response = await response.json();
    const status: number = response.status;
    console.log("full json response", status)

    return res;
})