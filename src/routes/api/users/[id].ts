import {getStorageUser} from "~/lib/users";
import {APIEvent}       from "@solidjs/start/server";

export const GET = (event: APIEvent) => {
    return getStorageUser(+event.params.id)
}