import {Component, ParentProps} from "solid-js";
import {baseApi, getUserToken} from "~/lib";
import {redirect} from "@solidjs/router";




const Chat =  async() => {
    let token = await getUserToken();
    if (!token) throw redirect("/")

    const response = await fetch(`${baseApi}/chat`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
    })
    const res: any = await response.json();
    console.log(res);

    // let ws = new WebSocket(`ws://localhost:${import.meta.env.VITE_WS_PORT}/ws`);

    return (
        <div>

        </div>
    );
};

export default Chat;