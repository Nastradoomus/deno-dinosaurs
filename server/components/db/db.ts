/*
  __  __    U  ___ u  _   _     ____    U  ___ u  ____    ____
U|' \/ '|u   \/"_ \/ | \ |"| U /"___|u   \/"_ \/ |  _"\U | __")u
\| |\/| |/   | | | |<|  \| |>\| |  _ /   | | | |/| | | |\|  _ \/
 | |  | |.-,_| |_| |U| |\  |u | |_| |.-,_| |_| |U| |_| |\| |_) |
 |_|  |_| \_)-\___/  |_| \_|   \____| \_)-\___/  |____/ u|____/
<<,-,,-.       \\    ||   \\,-._)(|_       \\     |||_  _|| \\_
 (./  \.)     (__)   (_")  (_/(__)__)     (__)   (__)_)(__) (__)
*/

import {
  Database,
  MongoClient,
} from "https://raw.githubusercontent.com/manyuanrong/deno_mongo/master/mod.ts";
import * as log from "https://raw.githubusercontent.com/denoland/deno/master/std/fmt/colors.ts";
import type { Dinosaur } from "../interfaces/dinosaur.ts";

const mongo = new MongoClient();
let database: Database;
interface Schema {
  _id: { $oid: string };
  slug: string;
  name: string;
  description: string;
  image?: string;
}

export default class MongoDb {
  host: string;
  un: string;
  pw: string;
  db: string;
  #connected: boolean = false;

  constructor(host: string, un: string, pw: string, db: string) {
    this.host = host;
    this.un = un;
    this.pw = pw;
    this.db = db;
  }
  get connected(): boolean {
    return this.#connected;
  }

  print = () => {
    console.log(
      log.yellow("Your Mongo data is:" + JSON.stringify(this, null, 2)),
    );
  };

  init = async () => {
    mongo.connectWithUri(this.host);
    try {
      setTimeout(() => {
        console.log(log.green("🥕 Checking Mongo connection..."));
      }, 1);
      const list = await mongo.listDatabases();
    } catch (e) {
      this.#connected = false;
      console.log(`❌ ${e}`);
    } finally {
      database = mongo.database(this.db);
      this.#connected = true;
      setTimeout(() => {
        console.log(
          log.brightMagenta("⚓ Mongo online & database: " + this.db),
        );
      }, 1);
    }
  };
  listone = async (slug: string) => {
    if (this.#connected) {
      const dinosaurs = database.collection<Schema>("dinosaurs");
      try {
        const one = await dinosaurs.findOne({ slug: slug });
        if (one) return one;
        else console.log(log.red(`❌ MongoDB Not found with slug: ${slug}`));
      } catch (e) {
        console.log(`❌ ${e}`);
      }
    }
  };
  list = async () => {
    if (this.#connected) {
      try {
        const dinosaurs = database.collection<Schema>("dinosaurs");
        const all = await dinosaurs.find({ name: { $ne: null } });
        return all;
      } catch (e) {
        console.log(`❌ ${e}`);
      }
    }
  };
  checkSlug = async (s: string) => {
    const dinosaurs = database.collection<Schema>("dinosaurs");
    const slugExists = await dinosaurs.findOne({ slug: s });
    if (slugExists === null) {
      return true;
    } else return false;
  };

  add = async (d: Dinosaur) => {
    if (this.#connected) {
      const dinosaurs = database.collection<Schema>("dinosaurs");
      try {
        dinosaurs.insertOne({
          name: d.name,
          slug: d.slug,
          description: d.description,
          image: d.image,
        });
        console.log(log.blue("⛳ Added a new dinosaur to database!"));
        return true;
      } catch (e) {
        console.log(log.red("❌ Could not add a dinosaur to database!"));
        return false;
      }
    }
  };

  remove = async (d: Dinosaur) => {
    if (this.#connected) {
      const dinosaurs = database.collection<Schema>("dinosaurs");
      try {
        dinosaurs.deleteOne({
          slug: d.slug,
        });
        console.log(log.blue("💔 Removed dinosaur from database!"));
        return true;
      } catch (e) {
        console.log(log.red("❌ Could not remove a dinosaur fromdatabase!"));
        return false;
      }
    }
  };
}
