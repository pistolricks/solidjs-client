import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

export type REGISTER_USER = {
    id: number;
    name: string;
    email: string;
    password: string;
}

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
    },
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        age: 25,
    }
])

storage.setItem("users:counter", 2)