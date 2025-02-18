import {GeoJSON, GeoJsonObject, Geometry, GeometryCollection} from "geojson";
import {createStore} from "solid-js/store";

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
    Regex: string
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

export type OsmOutput = {
    place_id: number,
    licence?: string,
    osm_type: string,
    osm_id: number,
    boundingbox?: string[],
    lat: string,
    lon: string,
    display_name?: string,
    class?: string,
    type?: string,
    importance?: number,
    icon?: string,
    address?: {
        city?: string,
        state_district?: string,
        state?: string,
        "ISO3166-2-lvl4"?: string,
        postcode?: string,
        country?: string,
        country_code?: string,
    },
    extratags?: {
        capital?: string,
        website?: string,
        wikidata?: string,
        wikipedia?: string,
        population?: string,
    }
}


export interface FeatureCollection<G = Geometry | GeometryCollection, P = Properties> extends GeoJsonObject {
    type: "FeatureCollection";
    features: Array<Feature<G, P>>;
}

export declare type Properties = {
    [name: string]: any;
} | null;

export interface Feature<G = Geometry | GeometryCollection, T = string | number, P = Properties> extends GeoJsonObject {
    type: "Feature";
    geometry: G;
    properties: P;
    id?: T;
}


export const [getOsmResults, setOsmResults] = createStore<{
    count: number,
    results: OsmOutput[]
}>({
    count: 0,
    results: [],
})

export type LookupResult = {
    place_id: number;
    licence?: string;
    osm_type: string;
    osm_id: number;
    boundingbox?: string[];
    lat?: string;
    lon?: string;
    display_name?: string;
    class?: string;
    type?: string;
    importance?: number;
    address?: {
        tourism?: string
        road?: string
        suburb?: string
        city?: string
        state?: string
        postcode?: string
        country?: string
        country_code?: string
    },
    extratags?: {
        image?: string
        heritage?: string
        wikidata?: string
        architect?: string
        wikipedia?: string
        wheelchair?: string
        description?: string
        "heritage:website"?: string
        "heritage:operator"?: string
        "architect:wikidata"?: string
        year_of_construction?: string
    }
}

export type RevesrseLookupResults = {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    lat: string
    lon: string
    class: string
    type: string
    place_rank: number
    importance: number
    addresstype: string,
    name: string,
    display_name: string;
    address?: {
        amenity?: string;
        house_number?: string;
        road?: string;
        quarter?: string;
        neighbourhood?: string;
        suburb?: string;
        county?: string;
        city?: string;
        state?: string;
        'ISO3166-2-lvl4'?: string;
        postcode?: string;
        country?: string;
        country_code?: string;
        town?: string;
        province?: string;
        region?: string;
    },
    boundingbox: string[],
    extratags?: any

}