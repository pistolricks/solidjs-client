import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/layouts/partials/nav";
import "./css/app.css";
import "@fontsource/inter";
import {Toaster} from "~/components/ui/toast";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
        <Toaster />
    </Router>
  );
}
