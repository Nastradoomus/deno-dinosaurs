/*
U _____ u _   _  __     __
\| ___"|/| \ |"| \ \   /"/u
 |  _|" <|  \| |> \ \ / //
 | |___ U| |\  |u /\ V /_,-.
 |_____| |_| \_| U  \_/-(_/
 <<   >> ||   \\,-.//
(__) (__)(_")  (_/(__)
*/

//ENV
import { config, DotenvConfig } from "https://deno.land/x/dotenv/mod.ts";
import * as log from "https://deno.land/std/fmt/colors.ts";

export interface DbEnv {
  SERVER: string;
  UN: string;
  PW: string;
  DB: string;
}

export type DbEnvErrors = Array<keyof DbEnv>;

function createEmptyDBEnv(): DbEnv {
  return { SERVER: "", UN: "", PW: "", DB: "" };
}
export function parseDBEnv(): DbEnv {
  const errors: DbEnvErrors = [];
  let env: DotenvConfig | DbEnv = config();
  if (env.SERVER === undefined) errors.push("SERVER");
  if (env.UN === undefined) errors.push("UN");
  if (env.PW === undefined) errors.push("PW");
  if (env.DB === undefined) errors.push("DB");
  if (errors.length > 0) {
    console.log(
      log.cyan(
        "❌ Missing following properties from .env: " + errors.join(),
      ),
    );
    console.log(
      log.cyan(
        "❎ Parsing global ENVIRONMENT variables (Heroku)",
      ),
    );
    errors.splice(0, errors.length);
    env = createEmptyDBEnv();
    let denoEnv = Deno.env.toObject();
    if (Object.prototype.hasOwnProperty.call(denoEnv, "SERVER")) {
      env.SERVER = denoEnv.SERVER;
    } else errors.push("SERVER");
    if (Object.prototype.hasOwnProperty.call(denoEnv, "UN")) {
      env.UN = denoEnv.UN;
    } else errors.push("UN");
    if (Object.prototype.hasOwnProperty.call(denoEnv, "PW")) {
      env.PW = denoEnv.PW;
    } else errors.push("PW");
    if (Object.prototype.hasOwnProperty.call(denoEnv, "DB")) {
      env.DB = denoEnv.DB;
    } else errors.push("DB");
    if (errors.length > 0) {
      console.log(
        log.bgRed(
          "❌ Missing following properties from global ENVIRONMENT variables (Heroku): " +
            errors.join(),
        ),
      ),
        console.log(
          log.bgRed(
            "❌ Fix your MongoDB configuration.",
          ),
        ),
        console.log(
          log.blue("☠ Exiting application..."),
        );
      Deno.exit(0);
    }
  }
  const result = { SERVER: env.SERVER, UN: env.UN, PW: env.PW, DB: env.DB };
  console.log(
    log.green("✔ Database environment variables ok!"),
  );

  return result;
}
