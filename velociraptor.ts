//import type { ScriptsConfiguration } from "https://deno.land/x/velociraptor/mod.ts";

export default //<ScriptsConfiguration>
{
  scripts: {
    watch:
      "deno run --unstable --allow-net --allow-read --allow-write --allow-run --allow-env --watch ./server/app.ts",
    serve:
      "deno run --unstable --allow-net --allow-read  --allow-write --allow-run --allow-env ./server/app.ts",
    cache: "deno cache --unstable ./server/app.ts",
    reload:
      "deno run --reload --unstable --allow-net --allow-read  --allow-write --allow-run --allow-env ./server/app.ts",
  },
};
