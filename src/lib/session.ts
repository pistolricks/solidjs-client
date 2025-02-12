import {useSession} from "vinxi/http";
import {USER} from "~/lib/db";

export type SessionUser = {
    id: number
    name: string
    email: string
    token: string
    expiry: string
}
export function getSession() {
    return useSession({
        password: process.env.SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace"
    });
}

export async function getUser(): Promise<USER | null> {
    const session = await getSession();
    const userId = session.data.userId;

    if (!userId) return null;

    return await store.getUser(userId);
}