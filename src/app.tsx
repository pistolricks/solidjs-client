import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start/router";
import {Suspense} from "solid-js";
import "./css/app.css";
import "@fontsource/inter";
import {Toaster} from "~/components/ui/toast";
import BaseDrawer from "~/components/ui/base-drawer";
import Nav from "./components/layouts/partials/nav";

export default function App() {

    return (
        <Router
            root={props => (
                <>
                    <BaseDrawer id={'drawer-1'} {...props}>
                        <Nav {...props}/>
                        <Suspense>{props.children}</Suspense>
                    </BaseDrawer>
                </>
            )}
        >
            <FileRoutes/>
            <Toaster/>
        </Router>
    );
}
