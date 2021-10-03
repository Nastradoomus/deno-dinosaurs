/*
  __  __    U  ___ u  _   _     ____    U  ___ u  ____    ____
U|' \/ '|u   \/"_ \/ | \ |"| U /"___|u   \/"_ \/ |  _"\U | __")u
\| |\/| |/   | | | |<|  \| |>\| |  _ /   | | | |/| | | |\|  _ \/
 | |  | |.-,_| |_| |U| |\  |u | |_| |.-,_| |_| |U| |_| |\| |_) |
 |_|  |_| \_)-\___/  |_| \_|   \____| \_)-\___/  |____/ u|____/
<<,-,,-.       \\    ||   \\,-._)(|_       \\     |||_  _|| \\_
 (./  \.)     (__)   (_")  (_/(__)__)     (__)   (__)_)(__) (__)
*/

import { Database, MongoClient } from "https://deno.land/x/mongo/mod.ts";
import * as log from "https://deno.land/std/fmt/colors.ts";
import type { DbSchema, Dinosaur } from "../interfaces/dinosaur.ts";

export default class MongoDb {
  #connected: boolean = false;
  #mongo = new MongoClient();
  #db: Database | undefined;

  constructor(
    private host: string,
    private username: string,
    private password: string,
    private database: string,
  ) {
    this.#mongo.connect(this.host).then(() => {
      this.#db = this.#mongo.database(this.database);
    }).catch((e) => {
      console.log(`❌ ${e}`);
      console.log(log.red("❌ Fix MongoDB connection"));
      Deno.exit(0);
    }).finally(() => {
      this.#connected = true;
      console.log(
        log.brightMagenta("⚓ Mongo online & database: " + this.database),
      );
    });
  }

  get connected(): boolean {
    return this.#connected;
  }

  getSettings = () => {
    console.log(
      log.yellow("Your Mongo data is:" + JSON.stringify(this, null, 2)),
    );
  };

  listone = async (slug: string): Promise<Dinosaur | undefined> => {
    if (this.#db) {
      try {
        const dinosaurs = this.#db.collection<DbSchema>("dinosaurs");
        return dinosaurs.findOne({ slug: slug });
      } catch (e) {
        console.log(`❌ ${e}`);
      }
    }

    return;
  };

  list = async () => {
    if (this.#connected && this.#db) {
      try {
        const dinosaurs = this.#db.collection<DbSchema>("dinosaurs");
        return dinosaurs.find().toArray();
      } catch (e) {
        console.log(`❌ ${e}`);
      }
    }
  };

  slugExists = async (s: string) => {
    if (this.#connected && this.#db) {
      const dinosaurs = this.#db.collection<DbSchema>("dinosaurs");
      const slugExists = await dinosaurs.findOne({ slug: s });
      if (slugExists === null) {
        return false;
      } else return true;
    }
  };

  add = async (d: Dinosaur) => {
    if (this.#connected && this.#db && this.#db) {
      const { name, slug, description, image } = d;
      const dinosaurs = this.#db.collection<DbSchema>("dinosaurs");
      try {
        dinosaurs.insertOne({
          name: name,
          slug: slug,
          description: description,
          image: image,
        });
        console.log(
          log.blue(
            "⛳ Added a new dinosaur to database with a slug: " + slug + ".",
          ),
        );
        return true;
      } catch (e) {
        console.log(log.red("❌ Could not add a dinosaur to database!"));
        return false;
      }
    }
  };

  remove = async (s: string) => {
    if (this.#connected && this.#db) {
      const dinosaurs = this.#db.collection<DbSchema>("dinosaurs");
      try {
        dinosaurs.deleteOne({
          slug: s,
        });
        console.log(
          log.red("💔 Removed dinosaur with a slug " + s + " from database!"),
        );
        return true;
      } catch (e) {
        console.log(log.red("❌ Could not remove a dinosaur fromdatabase!"));
        return false;
      }
    }
  };
}
