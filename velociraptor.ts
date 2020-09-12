import { ScriptsConfiguration } from "https://deno.land/x/velociraptor@v1.0.0-beta.13/mod.ts";

export default <ScriptsConfiguration> {
  scripts: {
    watch:
      "deno run --unstable --watch --allow-net --allow-read --allow-env --allow-write --allow-plugin ./server/app.ts",
    justserve:
      "deno run --unstable --allow-net --allow-read --allow-env --allow-write --allow-plugin ./server/app.ts",
    serve:
      "deno run --allow-read --allow-run reload.ts --main=./server/app.ts unstable allow-net allow-read allow-env allow-write allow-plugin",
  },
};
