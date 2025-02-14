import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start/router";
import {Suspense} from "solid-js";
import "./css/app.css";
import "@fontsource/inter";
import {Toaster} from "~/components/ui/toast";
import AppLayout from "~/components/layouts/app-layout";
import {LayoutProvider} from "~/context/layout-provider";

export default function App() {

    return (
        <Router
            root={props => (
                <LayoutProvider>
                    <AppLayout>
                        <Suspense>{props.children}</Suspense>
                    </AppLayout>
                </LayoutProvider>
            )}
        >
            <FileRoutes/>
            <Toaster/>
        </Router>
    );
}
