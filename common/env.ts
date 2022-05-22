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
import { config } from "https://deno.land/std@0.140.0/dotenv/mod.ts";


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
export async function parseDBEnv(): Promise<DbEnv> {
	const errors: DbEnvErrors = [];
	let env: DbEnv = createEmptyDBEnv();

	try {
		env = Deno.env.toObject() as unknown as DbEnv;
		if (!Object.prototype.hasOwnProperty.call(env, "MONGO_SERVER")) errors.push("MONGO_SERVER");
		if (!Object.prototype.hasOwnProperty.call(env, "UN")) errors.push("UN");
		if (!Object.prototype.hasOwnProperty.call(env, "PW")) errors.push("PW");
		if (!Object.prototype.hasOwnProperty.call(env, "DB")) errors.push("DB");
		if (errors.length > 0) throw new Error;
	} catch (err) {
		logger.bgRed("❌ " + err + " Using ENV file");
		env = await config() as unknown as DbEnv;
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
			"❎ Parsing global ENVIRONMENT variables",
		), errors.splice(0, errors.length);
		if (!Object.prototype.hasOwnProperty.call(env, "MONGO_SERVER")) errors.push("MONGO_SERVER");
		if (!Object.prototype.hasOwnProperty.call(env, "UN")) errors.push("UN");
		if (!Object.prototype.hasOwnProperty.call(env, "PW")) errors.push("PW");
		if (!Object.prototype.hasOwnProperty.call(env, "DB")) errors.push("DB");
		if (errors.length > 0) {
			logger.bgRed(
				"❌ Missing following properties from global ENVIRONMENT variable: " +
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
export async function isLocal(): Promise<boolean | undefined> {
	try {
		const env = await config();
		if (env) {
			if (Object.prototype.hasOwnProperty.call(env, "LOCAL")) {
				return (env.LOCAL === "true") ? true : false;
			}
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
export async function dbLocal(): Promise<string | undefined> {
	const env = await config();
	return await env.DB_LOCAL;
}
