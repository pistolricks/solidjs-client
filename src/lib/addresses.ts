import {action, query, redirect} from "@solidjs/router";
import {baseApi, getUserToken} from "~/lib/server";


export const getAddresses = query(async () => {
    "use server";
    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)

    const response = await fetch(`${baseApi}/addresses`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
    })
    const res: any = await response.json();

    console.log(res);
    return res;
}, "addresses")


export const addAddress = action(async (data: FormData) => {
    "use server";
    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)


    const addressInput = {
        street_address: [String(data.get("street_address"))],
        locality: String(data.get("locality")),
        administrative_area: String(data.get("administrative_area")),
        post_code: String(data.get("post_code")),
        country: "US",
    }

    console.log("Address:", addressInput)

    const response = await fetch(`${baseApi}/addresses`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(addressInput)
    })

    const res: any = await response.json();
    const status: number = response.status;
    console.log("status", status)
    console.log("res", res)
    console.log("address", res?.address)
    console.log("coordinates", res?.coordinates)

    return res;
})

export const addressSearchHandler = action(async (data: FormData) => {
    "use server";
    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)

    let search = "";
    let postcode = data.get("postcode")

    if(!postcode) {
        search = String(data.get("search"))
    } else {
        search = String(data.get("search")) + ', ' + String(data.get("postcode"))
    }


    const addressInput = {
        search:  search,
    }

    console.log("addressInput", addressInput)

    const response = await fetch(`${baseApi}/addresses/search`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(addressInput)
    })

    const res: any = await response.json();
    const status: number = response.status;
    console.log("status", status)
    console.log("res", res.address)

    return res;
})


export const actionPositionHandler = action(async (data: FormData) => {
    "use server";
    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)

    const inputItems = {
        lat: data.get("lat"),
        lon: data.get("lon"),
    }

    console.log("inputItems", inputItems)

    const response = await fetch(`${baseApi}/addresses/position`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(inputItems)
    })

    const res: any = await response.json();
    const status: number = response.status;
    console.log("status", status)
    console.log("res", res)

    let mapInput = {
        title: res.results.display_name,
        filename: `${res.results.osm_type}-${res.results.osm_id}`,
        lat: res.results.lat,
        lng: res.results.lon,
    }

     // await createPositionMapHandler(mapInput)


    return res;
})

export const createPositionMapHandler = async (mapInput: {
    title: string,
    filename: string,
    lat: number,
    lng: number
}) => {
    "use server";
    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)

    const mapInputs = {
        title: `Lat: ${mapInput.lat} Lng: ${mapInput.lng} TC: ${Date.now()}`, // mapInput.title,
        filename: mapInput.filename,
        lat: mapInput.lat,
        lng: mapInput.lng,
    }

    console.log("mapInputs", mapInputs)

    const response = await fetch(`${baseApi}/maps/position`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(mapInputs)
    })

    const res: any = await response.json();
    const status: number = response.status;
    console.log("status", status)
    console.log("res", res)


    return res;
}


export const getAddressFormFormats = query(async () => {
    "use server";
    let token = await getUserToken();
    if (!token) throw redirect("/")

    console.log("Bearer:", token.token)

    console.log("getFormFormats was called")


    const response = await fetch(`${baseApi}/addresses/create`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
    })
    const res: any = await response.json();

    console.log(await res.form);
    return res.form;
}, "formats")


export const addressFieldNames: string[] = [
    "none",
    "Area",
    "City",
    "County",
    "Department",
    "District",
    "DoSi",
    "Eircode",
    "Emirate",
    "Island",
    "Neighborhood",
    "Oblast",
    "PINCode",
    "Parish",
    "PostTown",
    "PostalCode",
    "Prefecture",
    "Province",
    "State",
    "Suburb",
    "Townland",
    "VillageTownship",
    "ZipCode",
]

export function getAddressField(n: number) {
    return addressFieldNames[n];
}