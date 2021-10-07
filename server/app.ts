/*
  _   _       _      ____     _____    ____        _      ____      U  ___ u   U  ___ u  __  __     _   _   ____
  | \ |"|  U  /"\  u / __"| u |_ " _|U |  _"\ u U  /"\  u |  _"\      \/"_ \/    \/"_ \/U|' \/ '|uU |"|u| | / __"| u
 <|  \| |>  \/ _ \/ <\___ \/    | |   \| |_) |/  \/ _ \/ /| | | |     | | | |    | | | |\| |\/| |/ \| |\| |<\___ \/
 U| |\  |u  / ___ \  u___) |   /| |\   |  _ <    / ___ \ U| |_| |\.-,_| |_| |.-,_| |_| | | |  | |   | |_| | u___) |
  |_| \_|  /_/   \_\ |____/>> u |_|U   |_| \_\  /_/   \_\ |____/ u \_)-\___/  \_)-\___/  |_|  |_|  <<\___/  |____/>>
  ||   \\,-.\\    >>  )(  (__)_// \\_  //   \\_  \\    >>  |||_         \\         \\   <<,-,,-.  (__) )(    )(  (__)
  (_")  (_/(__)  (__)(__)    (__) (__)(__)  (__)(__)  (__)(__)_)       (__)       (__)   (./  \.)     (__)  (__)
                           ____  U _____ u _   _     U  ___ u        _       ____     ____
                          |  _"\ \| ___"|/| \ |"|     \/"_ \/    U  /"\  u U|  _"\ uU|  _"\ u
                         /| | | | |  _|" <|  \| |>    | | | |     \/ _ \/  \| |_) |/\| |_) |/
                         U| |_| |\| |___ U| |\  |u.-,_| |_| |     / ___ \   |  __/   |  __/
                          |____/ u|_____| |_| \_|  \_)-\___/     /_/   \_\  |_|      |_|
                           |||_   <<   >> ||   \\,-.    \\        \\    >>  ||>>_    ||>>_
                          (__)_) (__) (__)(_")  (_/    (__)      (__)  (__)(__)__)  (__)__)
*/

//ROUTES
import router from "./components/routes/index.ts";

//OAK
import { Application } from "https://deno.land/x/oak/mod.ts";

//ARGS
import { parse } from "https://deno.land/std/flags/mod.ts";

//IP
import { getIP } from "https://deno.land/x/get_ip/mod.ts";

//LOCAL
import { isLocal } from "../common/env.ts";

//LOGGER
import * as logger from "../common/log.ts";

logger.cyan("🦕 Welcome to Deno");

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const defaultPort = 1337;
const { args } = Deno;
const argPort = parse(args).port;
console.log(argPort);
/*
const realHostname = parse(args).host;
if (!realHost) {const local = isLocal();}

let realHostname: string | Promise<string>;
if (!local) realHostname = await getIP();
else realHostname = "127.0.0.1";
*/
app.addEventListener("listen", async ({ hostname, port, secure }) => {
  console.log(realHostname);
  logger.green(
    `Listening on: ${secure ? "https://" : "http://"}${realHostname ??
      "localhost"}:${port}`,
  );
  logger.green("🥕 Wait for Mongo connection...");
});

await app.listen({ port: argPort ? Number(argPort) : defaultPort });
