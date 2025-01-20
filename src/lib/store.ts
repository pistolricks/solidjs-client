import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

export type USER = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

export type MOVIES = {
    title: string
    year: number
    runtime: string
    genres: string[]
}

export const storage = createStorage({
    driver: fsLiteDriver({
        base: "./storage"
    })
})

storage.setItem("users:data", [
    {
        id: 0,
        firstName: "Jane",
        lastName: "Doe",
        age: 21,
    }
])

storage.setItem("users:counter", 2)

export type AUTHENTICATION_TOKEN = {
    token: string;
    expiry: string;
}
storage.setItem("auth:token", {
    token: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
    expiry: "2022-01-01T00:00:00.000Z"
})