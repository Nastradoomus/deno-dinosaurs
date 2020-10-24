/*
   ____   U  ___ u  _   _     _____    ____    U  ___ u   _       _     U _____ u   ____
U /"___|   \/"_ \/ | \ |"|   |_ " _|U |  _"\ u  \/"_ \/  |"|     |"|    \| ___"|/U |  _"\ u
\| | u     | | | |<|  \| |>    | |   \| |_) |/  | | | |U | | u U | | u   |  _|"   \| |_) |/
 | |/__.-,_| |_| |U| |\  |u   /| |\   |  _ <.-,_| |_| | \| |/__ \| |/__  | |___    |  _ <
  \____|\_)-\___/  |_| \_|   u |_|U   |_| \_\\_)-\___/   |_____| |_____| |_____|   |_| \_\
 _// \\      \\    ||   \\,-._// \\_  //   \\_    \\     //  \\  //  \\  <<   >>   //   \\_
(__)(__)    (__)   (_")  (_/(__) (__)(__)  (__)  (__)   (_")("_)(_")("_)(__) (__) (__)  (__)
*/

// REQUEST & RESPONSE
import type { Response } from "https://raw.githubusercontent.com/oakserver/oak/main/mod.ts";

export default {
  /**
   * @description Get root
   * @route GET /
   */

  default: ({ response }: { response: Response }) => {
    response.body = {
      success: true,
      data: "🦕 Welcome to my simple Deno server",
    };
  },
};
