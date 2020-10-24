import type { ScriptsConfiguration } from "https://deno.land/x/velociraptor/mod.ts";

export default <ScriptsConfiguration> {
  scripts: {
    watch:
      "deno run --unstable --allow-net --allow-read --allow-write --allow-plugin --allow-env --no-check --watch ./server/app.ts",
    serve:
      "deno run --unstable --allow-net --allow-read  --allow-write --allow-plugin --no-check --allow-env ./server/app.ts",
  },
};
