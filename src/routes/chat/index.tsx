import {Component, createEffect, createSignal, onMount, ParentProps} from "solid-js";
import "./../../ws.ts"
type PROPS = ParentProps

export type Client = {
    endpoint: string;
    seq: number;
    ready: boolean;
    ws: Promise<WebSocket> | null;
    pending: { [key: number]: { resolve: (value: any) => void; reject: (reason?: any) => void } };
    handler: { [key: string]: Array<(params: any, self: Client) => void> };
}

const Chat: Component<PROPS> = props => {


    let ws = new WebSocket(`ws://localhost:${import.meta.env.VITE_WS_PORT}/ws`);

    return (
        <div>

        </div>
    );
};

export default Chat;