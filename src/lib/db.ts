import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

export type USER = {
    id: number;
    name: string;
    email: string;
    activated: boolean;
    created_at: string;
}

const storage = createStorage({
    driver: fsLiteDriver({
        base: "./.data"
    })
});
storage.setItem("users:data", [{ id: 0, email: "kody", password: "twixrox" }]);
storage.setItem("users:counter", 1);

export const db = {
    user: {
        async create({ data }: { data: { email: string; password: string } }) {
            const [{ value: users }, { value: index }] = await storage.getItems(["users:data", "users:counter"]);
            const user = { ...data, id: index as number };
            await Promise.all([
                storage.setItem("users:data", [...(users as USER[]), user]),
                storage.setItem("users:counter", index as number + 1)
            ]);
            return user;
        },
        async findUnique({ where: { email = undefined, id = undefined } }: { where: { email?: string; id?: number } }) {
            const users = await storage.getItem("users:data") as USER[];
            if (id !== undefined) {
                return users.find(user => user.id === id);
            } else {
                return users.find(user => user.email === email);
            }
        }
    }
};