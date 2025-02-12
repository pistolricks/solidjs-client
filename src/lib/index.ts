import {redirect} from "@solidjs/router";

export * from './server'

export const redirectTo = (path?: string) => {
    let urlPath = `/${path ?? ``}`
    throw redirect(urlPath)
}