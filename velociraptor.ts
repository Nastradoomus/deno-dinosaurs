import type { ScriptsConfiguration } from "https://deno.land/x/velociraptor@v1.0.0-beta.13/mod.ts";

export default <ScriptsConfiguration> {
  scripts: {
    watch:
      "deno run --unstable --allow-net --allow-read --allow-write --allow-plugin --no-check --allow-env --watch ./server/app.ts",
    serve:
      "deno run --unstable --allow-net --allow-read  --allow-write --allow-plugin --no-check --allow-env ./server/app.ts",
  },
};
