import {baseApi} from "~/lib/server";

export type USER = {
    id: number;
    name: string;
    email: string;
    activated: boolean;
    created_at: string;
}


const fetchLogin = async (userInput: { email: string , password: string }) =>
    (await fetch(`${baseApi}/tokens/authentication`, {
            method: "POST",
            body: JSON.stringify(userInput),
        })
    )

const fetchLogout = async (userInput: { email: string , password: string }) =>
    (await fetch(`${baseApi}/tokens/authentication`, {
            method: "POST",
            body: JSON.stringify(userInput),
        })
    )

const fetchUser = async (userInput: { email: string, tokenPlaintext: string }) =>
    (await fetch(`${baseApi}/users/find`, {
            method: "POST",
            body: JSON.stringify(userInput),
        })
    )

const fetchByToken = async (email: string) =>
    (await fetch(`${baseApi}/users/find/token`, {
            method: "POST",
            body: JSON.stringify({email}),
        })
    )

export const db = {
    user: {
        async login({ where: { userInput } }: { where: { userInput: {email: string; password: string} } }) {
            const response: Response = await fetchLogin(userInput);
            const res: any = await response.json();
            return {
                user: res.user,
                authentication_token: res.authentication_token,
                status: response.status
            };
        },
        async findUser({where: {userInput}}:  { where: { userInput: {email: string; tokenPlaintext: string} } }) {
            const response: Response = await fetchUser(userInput);
            const res: any = await response.json();
            return res.user;
        },
        async findByToken({where: {tokenPlaintext}}: { where: { tokenPlaintext: string } }) {
            const response: Response = await fetchByToken(tokenPlaintext);
            const res: any = await response.json();
            return res.user;
        }
    }
}
