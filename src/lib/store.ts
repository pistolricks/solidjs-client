import {createStorage} from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

export type USER = {
    id: number;
    name: string;
    email: string;
    activated: boolean;
    created_at: string;
}

export type MOVIE = {
    title: string
    year: number
    runtime: string
    genres: string[]
}

export type MOVIE_DETAIL = {
    movie: MOVIE
}

export type MoviesData = {
    metadata: {
        current_page: number,
        page_size: number,
        first_page: number,
        last_page: number,
        total_records: number

    },
    movies: MOVIE[]
}

export const storage = createStorage({
    driver: fsLiteDriver({
        base: "./storage"
    })
})

storage.setItem("user:data", {
        id: 0,
        name: "",
        email: "",
        activated: false,
        created_at: "",
    }
)

// storage.setItem("users:counter", 2)

export type AUTHENTICATION_TOKEN = {
    token: string;
    expiry: string;
}
storage.setItem("auth:token", {
    token: "",
    expiry: "2022-01-01T00:00:00.000Z"
})