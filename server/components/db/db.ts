/*
  __  __    U  ___ u  _   _     ____    U  ___ u  ____    ____
U|' \/ '|u   \/"_ \/ | \ |"| U /"___|u   \/"_ \/ |  _"\U | __")u
\| |\/| |/   | | | |<|  \| |>\| |  _ /   | | | |/| | | |\|  _ \/
 | |  | |.-,_| |_| |U| |\  |u | |_| |.-,_| |_| |U| |_| |\| |_) |
 |_|  |_| \_)-\___/  |_| \_|   \____| \_)-\___/  |____/ u|____/
<<,-,,-.       \\    ||   \\,-._)(|_       \\     |||_  _|| \\_
 (./  \.)     (__)   (_")  (_/(__)__)     (__)   (__)_)(__) (__)
*/

import { MongoClient } from "https://raw.githubusercontent.com/manyuanrong/deno_mongo/master/mod.ts";
import * as Colors from "https://deno.land/std/fmt/colors.ts";

const mongo = new MongoClient();
const log = Colors;
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

  print = () => {
    console.log(
      log.yellow("Your Mongo data is:" + JSON.stringify(this, null, 2)),
    );
  };
  init = async () => {
    try {
      mongo.connectWithUri(this.host);
      const database = mongo.database(this.db);
      if (database) {
        this.#connected = true;
        console.log(
          log.brightMagenta("⚓ Mongo online & database: " + this.db),
        );
      }
    } catch (err) {
      console.log(`❌ ${err}`);
    }
  };
  list = async () => {
    if (this.#connected) {
      console.log("list");
    }
  };
  add = async () => {
    if (this.#connected) {
      console.log("add");
    }
  };
  remove = async () => {
    if (this.#connected) {
      console.log("remove");
    }
  };
}
