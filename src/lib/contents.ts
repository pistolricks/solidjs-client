import {action, query, redirect, revalidate} from "@solidjs/router";
import {createSignal} from "solid-js";
import {baseApi, getUserToken} from "~/lib/server";
import {getSessionFolder} from "~/lib/session";

export const getContents = query(async () => {
    "use server";
    let token = await getUserToken();
    if (!token) throw redirect("/")

    let folder = await getSessionFolder()

    console.log("Bearer:", token.token)

    const response = await fetch(`${baseApi}/contents?folder=${folder}`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
    })
    const res: any = await response.json();
    console.log(res);
    return res;
}, "contents")

export const getContent = query(async (id: number) => {
    "use server";

    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)

    console.log("getContent was called")
    const response = await fetch(`${baseApi}/contents/${id}`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
    })
    const res: any = await response.json();

    console.log(res);
    return res;
}, "content")


export const uploadFileHandler = (async (data: FormDataEntryValue[]) => {
    "use server";

    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)
    console.log("data", data[0])
    const [getFile, setFile] = createSignal<any>(data[0])

    const contentInput = {
        name: getFile()?.name,
        src: getFile(),
        type: getFile()?.type,
        size: getFile()?.size,
    }

    const formData = new FormData();
    if (contentInput.src) {
        formData.append("file", contentInput.src);
        formData.append("name", contentInput.name);
        formData.append("size", contentInput.size);
        formData.append("type", contentInput.type);
    }

    console.log("contentInput", contentInput)

    const response: Response = await fetch(`${baseApi}/upload/image`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`,
        },
        body: formData
    })
    const res: any = await response.json();
    const status: number = response.status;


    console.log("response", res);
    console.log("full json response", status)

    return res;
})