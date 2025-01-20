import {getUser} from "~/lib/users";
import {APIEvent}       from "@solidjs/start/server";

export const GET = () => {
    return getUser()
}