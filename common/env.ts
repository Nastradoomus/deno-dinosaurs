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
import { config, DotenvConfig } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

//LOGGER
import * as logger from "./log.ts";

export interface DbEnv {
	MONGO_SERVER: string;
	UN: string;
	PW: string;
	DB: string;
	HEROKUAPP_URL?: string;
}

export interface Env extends DbEnv {
	LOCAL: boolean;
}

export type DbEnvErrors = Array<keyof DbEnv>;

function createEmptyDBEnv(): DbEnv {
	return { MONGO_SERVER: "", UN: "", PW: "", DB: "" };
}
export function parseDBEnv(): DbEnv {
	const errors: DbEnvErrors = [];
	let env: DbEnv = createEmptyDBEnv();

	try {
		env = config() as unknown as DbEnv;
	} catch (err) {
		logger.bgRed("❌ Not using ENV file: " + err);
		env = Deno.env.toObject() as unknown as DbEnv;
	}

	if (env.MONGO_SERVER === undefined) errors.push("MONGO_SERVER");
	if (env.UN === undefined) errors.push("UN");
	if (env.PW === undefined) errors.push("PW");
	if (env.DB === undefined) errors.push("DB");
	if (errors.length > 0) {
		logger.cyan(
			"❌ Missing following properties from .env: " + errors.join(),
		);
		logger.cyan(
			"❎ Parsing global ENVIRONMENT variables (Heroku)",
		), errors.splice(0, errors.length);
		if (!Object.prototype.hasOwnProperty.call(env, "MONGO_SERVER")) errors.push("MONGO_SERVER");
		if (!Object.prototype.hasOwnProperty.call(env, "UN")) errors.push("UN");
		if (!Object.prototype.hasOwnProperty.call(env, "PW")) errors.push("PW");
		if (!Object.prototype.hasOwnProperty.call(env, "DB")) errors.push("DB");
		if (errors.length > 0) {
			logger.bgRed(
				"❌ Missing following properties from global ENVIRONMENT variables (Heroku): " +
				errors.join(),
			);
			logger.bgRed("❌ Fix your MongoDB configuration.");
			logger.blue("☠ Exiting application...");
			Deno.exit(0);
		}
	}
	logger.green("✔ Database environment variables ok!");
	return { MONGO_SERVER: env.MONGO_SERVER, UN: env.UN, PW: env.PW, DB: env.DB };
}
export function isLocal(): boolean | undefined {
	try {
		const env: DotenvConfig = config();
		if (Object.prototype.hasOwnProperty.call(env, "LOCAL")) {
			return (env.LOCAL === "true") ? true : false;
		}
	} catch (err) {
		logger.bgRed("❌ Not using ENV file: " + err);
		return false;
	}
	return;
}
export function herokuUrl(): string | undefined {
	const env = Deno.env.toObject() as unknown as DbEnv;
	if (Object.prototype.hasOwnProperty.call(env, "HEROKUAPP_URL")) {
		return env.HEROKUAPP_URL;
	}
	return;
}
export function dbLocal(): string | undefined {
	return config().DB_LOCAL;
}
