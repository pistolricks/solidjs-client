import {getHealthcheck} from "~/lib/healthcheck";

export function GET() {
    return getHealthcheck();
}