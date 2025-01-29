// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import {Toaster} from "~/components/ui/toast";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html class="h-full bg-gray-app scroll-smooth" lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class="h-full">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
