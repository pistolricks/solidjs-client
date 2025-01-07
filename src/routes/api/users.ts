import {addStorageUser, getStorageUsers} from "~/lib/users";
import {APIEvent}                        from "@solidjs/start/server";

export function GET() {
    return getStorageUsers();
}

export const POST = async (event: APIEvent) => {
    const post = await addStorageUser(await event.request.json());
    return new Response(JSON.stringify(post), {status: 201});
}