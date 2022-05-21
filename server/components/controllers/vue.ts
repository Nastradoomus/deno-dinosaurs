/*
 __     __    _   _ U _____ u       ____   U  ___ u  _   _     _____    ____    U  ___ u   _       _     U _____ u   ____
 \ \   /"/uU |"|u| |\| ___"|/    U /"___|   \/"_ \/ | \ |"|   |_ " _|U |  _"\ u  \/"_ \/  |"|     |"|    \| ___"|/U |  _"\ u
  \ \ / //  \| |\| | |  _|"      \| | u     | | | |<|  \| |>    | |   \| |_) |/  | | | |U | | u U | | u   |  _|"   \| |_) |/
  /\ V /_,-. | |_| | | |___       | |/__.-,_| |_| |U| |\  |u   /| |\   |  _ <.-,_| |_| | \| |/__ \| |/__  | |___    |  _ <
 U  \_/-(_/ <<\___/  |_____|       \____|\_)-\___/  |_| \_|   u |_|U   |_| \_\\_)-\___/   |_____| |_____| |_____|   |_| \_\
   //      (__) )(   <<   >>      _// \\      \\    ||   \\,-._// \\_  //   \\_    \\     //  \\  //  \\  <<   >>   //   \\_
  (__)         (__) (__) (__)    (__)(__)    (__)   (_")  (_/(__) (__)(__)  (__)  (__)   (_")("_)(_")("_)(__) (__) (__)  (__)
*/

// REQUEST & RESPONSE
import type { Context, Response } from "https://deno.land/x/oak/mod.ts";
//"https://deno.land/x/oak@v9.0.1/mod.ts";

//ENV
import { config } from "https://deno.land/x/dotenv/mod.ts";

//INTERFACE
import type { Dinosaur } from "../types/types.d.ts";

//SCHEMA
import DinosaurSchema from "../schema/dinosaur.ts";

//LOGGER
import * as logger from "../../../common/log.ts";

export default {
  init: async ({ response }: { response: Response }) => {
    response.body = {
      success: true,
      data: "VUE!",
    };
  },
};
