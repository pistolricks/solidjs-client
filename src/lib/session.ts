import {useSession} from "vinxi/http";
import {USER} from "~/lib/db";
import {AUTHENTICATION_TOKEN} from "~/lib/index";

export type SessionUser = {
    id?: number
    name?: string
    email?: string
    activated?: boolean;
    created_at?: string;
    token?: string
    expiry?: string
    folder?: string
}




export function getSession() {
    "use server";
    return useSession({
        password: import.meta.env.VITE_SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace"
    });
}

export async function updateSessionUser(user: USER, authentication_token: AUTHENTICATION_TOKEN, folder: string ) {
    "use server";
    try {
        const session = await getSession();
        await session.update((d: SessionUser) => {
            d.id = user?.id;
            d.name = user?.name;
            d.email = user?.email;
            d.activated = user?.activated;
            d.created_at = user?.created_at;
            d.token = authentication_token?.token;
            d.expiry = authentication_token?.expiry;
            d.folder = folder
        });

    } catch (err) {
        return err as Error;
    }
}

export async function getSessionUser(): Promise<USER | undefined> {
    "use server";
    const session = await getSession();

    const user = {
        id: session.data.id,
        name: session.data.name,
        email: session.data.email,
        activated: session.data.activated,
        created_at: session.data.created_at,
        folder: session.data.folder,
    }

    if (user.email === "") return undefined;

    return user;
}

export async function getSessionToken(): Promise<AUTHENTICATION_TOKEN | undefined> {
    "use server";
    const session = await getSession();

    const token = {
        token: session.data.token,
        expiry: session.data.expiry
    }

    if (!token.token) return undefined;
    return token;
}

export async function getSessionFolder(): Promise<string | undefined> {
    "use server";
    const session = await getSession();

    const folderName: string = session.data.folder;

    if (!folderName) return undefined;
    return folderName;
}

export async function clearSessionUser() {
    "use server";
    try {
        const session = await getSession();
        await session.update((d: SessionUser) => {
            d.id = undefined;
            d.name = undefined;
            d.email = undefined;
            d.activated = undefined;
            d.created_at = undefined;
            d.token = undefined;
            d.expiry = undefined;
            d.folder = undefined;
        });

    } catch (err) {
        return err as Error;
    }
}