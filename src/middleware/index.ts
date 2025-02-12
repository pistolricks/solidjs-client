import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
    onRequest: (event) => {
        console.log("Request received:", event.request.url);
    },
    onBeforeResponse: (event) => {
        console.log("Sending response:", event.response.status);
    },
});