import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
    onRequest: (event) => {
 //       console.log("Request received from middleware:", event.request.url);
    },
    onBeforeResponse: (event) => {
   //     console.log("Sending event response from middleware:", event.response.status);
    },
});