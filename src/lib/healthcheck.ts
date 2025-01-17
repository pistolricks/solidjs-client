import {query} from "@solidjs/router";

export const getHealthcheck = query(async () => {
    "use server";
    console.log("getHealthcheck was called")
    const response = await fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}/healthcheck`)
    const data = await response.json();
    console.log(data);
    return data;
}, "health")