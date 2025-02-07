import {useSession} from "vinxi/http";
import {db} from "./db";

export const baseApi = (`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}`)


export async function login(email: string, password: string) {
    const user = await db.user.findUnique({where: {email}});
    // if (!user || password !== user.password) throw new Error("Invalid login");
    return user;
}

export async function logout() {
    const session = await getSession();
    await session.update(d => {
        d.userId = undefined;
    });
}

export async function register(email: string, password: string) {
    const existingUser = await db.user.findUnique({where: {email}});
    if (existingUser) throw new Error("User already exists");
    return db.user.create({
        data: {email: email, password}
    });
}

export function getSession() {
    return useSession({
        password: process.env.SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace"
    });
}