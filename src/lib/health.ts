import {query} from "@solidjs/router";

export const getHealth = query(async () => {
    "use server";
    console.log("getHealth was called")
    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/v1/healthcheck`)
    const data = await response.json();
    console.log(data);
    return data;
}, "health")