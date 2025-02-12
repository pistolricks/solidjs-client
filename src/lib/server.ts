import {useSession} from "vinxi/http";
import {db} from "./db";
import {getSession} from "~/lib/session";

export const baseApi = (`http://localhost:${import.meta.env.VITE_SERVER_PORT}/${import.meta.env.VITE_API_VERSION}`)


export async function login(userInput: { email: string, password: string }) {
    const user = await db.user.login({ where: { userInput } } );
    console.log(user);
    return user;
}

export async function logout() {
    const session = await getSession();
    await session.update(d => {
        d.userId = undefined;
    });
}


