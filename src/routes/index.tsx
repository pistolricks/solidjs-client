import {RouteSectionProps} from "@solidjs/router";
import {Button} from "~/components/ui/button";
import HomeSection from "~/components/home";


export default function Home(props: RouteSectionProps) {

    return (<HomeSection background_images={[import.meta.env.VITE_HOME_BACKGROUND_IMAGES]}/>);
}
