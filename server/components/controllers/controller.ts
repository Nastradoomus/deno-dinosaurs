/*
	 ____   U  ___ u  _   _     _____    ____    U  ___ u   _       _     U _____ u   ____
U /"___|   \/"_ \/ | \ |"|   |_ " _|U |  _"\ u  \/"_ \/  |"|     |"|    \| ___"|/U |  _"\ u
\| | u     | | | |<|  \| |>    | |   \| |_) |/  | | | |U | | u U | | u   |  _|"   \| |_) |/
 | |/__.-,_| |_| |U| |\  |u   /| |\   |  _ <.-,_| |_| | \| |/__ \| |/__  | |___    |  _ <
	\____|\_)-\___/  |_| \_|   u |_|U   |_| \_\\_)-\___/   |_____| |_____| |_____|   |_| \_\
 _// \\      \\    ||   \\,-._// \\_  //   \\_    \\     //  \\  //  \\  <<   >>   //   \\_
(__)(__)    (__)   (_")  (_/(__) (__)(__)  (__)  (__)   (_")("_)(_")("_)(__) (__) (__)  (__)
*/

// RESPONSE
import { Response } from "https://deno.land/x/oak@v10.5.1/mod.ts";
//"https://deno.land/x/oak@v9.0.1/mod.ts";

export default {
	default: ({ response }: { response: Response }) => {
		response.body = {
			success: true,
			data: "🦕 Welcome to my simple Deno server",
		};
	},
};
