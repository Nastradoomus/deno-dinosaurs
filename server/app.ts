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

//CONSOLE
import * as log from "https://deno.land/std/fmt/colors.ts";

//ROUTES
import router from "./components/routes/index.ts";

//OAK
import { Application } from "https://deno.land/x/oak/mod.ts";

//ARGS
import { parse } from "https://deno.land/std/flags/mod.ts";

/*
  ____   U _____ u   ____   __     __ U _____ u
 / __"| u\| ___"|/U |  _"\ u\ \   /"/u\| ___"|/
<\___ \/  |  _|"   \| |_) |/ \ \ / //  |  _|"
 u___) |  | |___    |  _ <   /\ V /_,-.| |___
 |____/>> |_____|   |_| \_\ U  \_/-(_/ |_____|
  )(  (__)<<   >>   //   \\_  //       <<   >>
 (__)    (__) (__) (__)  (__)(__)     (__) (__)
 */

console.log(log.cyan("🦕 Welcome to Deno"));

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const defaultPort = 1337;
const { args } = Deno;
const argPort = parse(args).port;

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(log.blue(
    `👂 ${secure ? "https://" : "http://"}${hostname}:${port}`,
  ));
  console.log(log.green("🥕 Wait for Mongo connection..."));
});

await app.listen({ port: argPort ? Number(argPort) : defaultPort });
