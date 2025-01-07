import {storage, USER} from "~/lib/store";

export const getStorageUsers = async () => {
    return ((await storage.getItem("users:data")) as USER[]).reverse();
}

export const getStorageUser = async (id: number) => {
    return ((await storage.getItem("users:data")) as USER[]).find(
        user => user.id === id
    );
}

type userInput = Pick<USER, "firstName" | "lastName" | "age">

export const addStorageUser = async (userInput: userInput) => {
    let [{value: users}, {value: index}] = await storage.getItems([
        "users:data",
        "users:counter"
    ])

    let user;
    await Promise.all([
        storage.setItem("users:data", [
            ...(users as USER[]),
            (user = {
                ...userInput,
                id: index as number,
            }),
            storage.setItem("users:counter", (index as number) + 1)
        ])
    ])
    return user;
}