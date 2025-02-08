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
    id: number
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

export type VENDOR = {
    id: number
    title: string
    year: number
    runtime: string
    genres: string[]
}

export type VENDOR_DETAIL = {
    vendor: VENDOR
}

export type VendorsData = {
    metadata: {
        current_page: number,
        page_size: number,
        first_page: number,
        last_page: number,
        total_records: number

    },
    vendors: VENDOR[]
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


export type CONTENT = {
    id: string;
    created_at: string;
    name: string;
    original: string;
    hash: string;
    src: string;
    type: string;
    size: number;
    user_id: string;
}

storage.setItem("contents:data", [{
    id: "",
    created_at: "",
    name: "",
    original: "",
    hash: "",
    src: "",
    type: "",
    size: 0,
    user_id: "",

}]);

export type CONTENT_DETAIL = {
    content: CONTENT
}

export type ContentsData = {
    metadata: {
        current_page: number,
        page_size: number,
        first_page: number,
        last_page: number,
        total_records: number

    },
    contents: CONTENT[]
}


export type AddressData = any;

export type AreaSelect = {
    ID: string;
    Localities?: string
    Name: string;
}
export type postCodeRegex = {
    Regex:           string
    SubdivisionRegex: any
}

export type CountryData = {
    Format?: string
    LatinizedFormat?: string
    Required?: string[]
    Allowed?: string[]
    DefaultLanguage?: string
    AdministrativeAreaNameType?: number
    LocalityNameType?: number
    DependentLocalityNameType?: number
    PostCodeNameType?: number
    PostCodeRegex?: postCodeRegex
    AdministrativeAreas?: any
}
