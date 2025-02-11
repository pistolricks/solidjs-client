import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start/router";
import {Suspense} from "solid-js";
import "./css/app.css";
import "@fontsource/inter";
import {Toaster} from "~/components/ui/toast";
import BaseDrawer from "~/components/ui/base-drawer";
import Nav from "./components/layouts/partials/nav";
import BaseDialog from "~/components/ui/base-dialog";
import AppLayout from "~/components/layouts/app-layout";

export default function App() {

    return (
        <Router
            root={props => (
                    <AppLayout>
                        <Suspense>{props.children}</Suspense>
                    </AppLayout>
            )}
        >
            <FileRoutes/>
            <Toaster/>
        </Router>
    );
}
