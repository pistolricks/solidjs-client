import {registerUserHandler, getStorageUsers} from "~/lib/users";
import {APIEvent}                        from "@solidjs/start/server";

export function GET() {

}

export const POST = async (event: APIEvent) => {
    const post = await registerUserHandler(await event.request.json());
    return new Response(JSON.stringify(post), {status: 201});
}