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
import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
"https://deno.land/x/oak@v9.0.1/mod.ts";
//ARGS
import { parse } from "https://deno.land/std@0.140.0/flags/mod.ts";

//IP
import { getIP } from "https://deno.land/x/get_ip@v2.0.0/mod.ts";

//LOCAL
import { herokuUrl, isLocal } from "../common/env.ts";

//LOGGER
import * as logger from "../common/log.ts";

logger.cyan("🦕 Welcome to Deno");

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const defaultPort = 1337;
const { args } = Deno;
const argPort = parse(args).port;
let hostname = parse(args).host;
let heroku: string | undefined;
if (!hostname) {
	heroku = herokuUrl();
	if (heroku) hostname = heroku;
	else hostname = await isLocal() ? "127.0.0.1" : await getIP();
}

app.addEventListener("listen", ({ port, secure }) => {
	let message;
	if (heroku) {
		message = `Listening on: ${secure ? "https://" : "http://"}${hostname}`;
	} else {
		message = `Listening on: ${secure ? "https://" : "http://"}${hostname ??
			"localhost"
			}:${port}`;
	}
	logger.green(message);
	logger.green("🥕 Wait for Mongo connection...");
});

await app.listen({ port: argPort ? Number(argPort) : defaultPort });
