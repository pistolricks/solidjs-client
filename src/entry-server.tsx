// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html class="h-full bg-gray-app scroll-smooth" lang="en">
      <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
          {/*
          <link href="/dist/styles.css" rel="stylesheet"/>
          */}
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
