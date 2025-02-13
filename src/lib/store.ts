import {GeoJSON, GeoJsonObject, Geometry, GeometryCollection} from "geojson";

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

export interface FeatureCollection<G = Geometry | GeometryCollection, P = Properties> extends GeoJsonObject {
    type: "FeatureCollection";
    features: Array<Feature<G, P>>;
}

export declare type Properties = {
    [name: string]: any;
} | null;

export interface Feature<G = Geometry | GeometryCollection, T = string|number, P = Properties> extends GeoJsonObject {
    type: "Feature";
    geometry: G;
    properties: P;
    id?: T;
}