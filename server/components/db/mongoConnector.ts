/*
  __  __    U  ___ u  _   _     ____    U  ___ u  ____    ____         ____   U  ___ u  _   _     _   _   U _____ u   ____   _____   U  ___ u   ____
U|' \/ '|u   \/"_ \/ | \ |"| U /"___|u   \/"_ \/ |  _"\U | __")u    U /"___|   \/"_ \/ | \ |"|   | \ |"|  \| ___"|/U /"___| |_ " _|   \/"_ \/U |  _"\ u
\| |\/| |/   | | | |<|  \| |>\| |  _ /   | | | |/| | | |\|  _ \/    \| | u     | | | |<|  \| |> <|  \| |>  |  _|"  \| | u     | |     | | | | \| |_) |/
 | |  | |.-,_| |_| |U| |\  |u | |_| |.-,_| |_| |U| |_| |\| |_) |     | |/__.-,_| |_| |U| |\  |u U| |\  |u  | |___   | |/__   /| |\.-,_| |_| |  |  _ <
 |_|  |_| \_)-\___/  |_| \_|   \____| \_)-\___/  |____/ u|____/       \____|\_)-\___/  |_| \_|   |_| \_|   |_____|   \____| u |_|U \_)-\___/   |_| \_\
<<,-,,-.       \\    ||   \\,-._)(|_       \\     |||_  _|| \\_      _// \\      \\    ||   \\,-.||   \\,-.<<   >>  _// \\  _// \\_     \\     //   \\_
 (./  \.)     (__)   (_")  (_/(__)__)     (__)   (__)_)(__) (__)    (__)(__)    (__)   (_")  (_/ (_")  (_/(__) (__)(__)(__)(__) (__)   (__)   (__)  (__)
*/

import {
  Database,
  Filter,
  MongoClient,
} from "https://deno.land/x/mongo/mod.ts";
import * as logger from "../../../common/log.ts";
import type { Dinosaur, DinosaurDbSchema, WithSlug } from "../types/types.d.ts";
import { Collection } from "https://deno.land/x/mongo/mod.ts";

export default class MongoDb<T> {
  #mongo = new MongoClient();
  #db: Database | undefined;
  #collection: Collection<T> | undefined;

  constructor(
    private host: string,
    private username: string,
    private password: string,
    private database: string,
  ) {
    this.connect();
  }

  connect = async () => {
    try {
      await this.#mongo.connect(
        "mongodb+srv://" + this.username + ":" + this.password + "@" +
          this.host + "/" + this.database +
          "?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1",
      );
      this.#db = this.#mongo.database(this.database);
      this.#collection = this.#db.collection<T>("dinosaurs");
      logger.brightMagenta("⚓ Mongo online & database: " + this.database);
    } catch (e) {
      logger.red(`❌ ${e}`);
      logger.red("❌ Fix MongoDB connection");
      Deno.exit(0);
    }
  };

  get connected(): true | undefined {
    if (this.#db) return true;
    return;
  }

  get dinosaurs(): Collection<T> | undefined {
    return this.#collection;
  }

  getSettings = () => {
    logger.yellow("Your Mongo data is:" + JSON.stringify(this, null, 2));
  };

  close = async () => this.#mongo.close();

  list = async <T>(): Promise<T | undefined> => {
    if (this.#db) {
      try {
        return await this.#collection!.find({}, { noCursorTimeout: false })
          .toArray() as unknown as T;
      } catch (e) {
        logger.red(`❌ ${e}`);
      }
    }
  };

  listOneWithSlug = async <T>(slug: string): Promise<T | undefined> => {
    if (!this.#db) return;
    try {
      const result = await this.#collection!
        .findOne(
          { slug } as Filter<WithSlug<T>>,
          {
            noCursorTimeout: false,
          },
        ) as unknown as T;
      return result;
    } catch (e) {
      logger.red(`❌ ${e}`);
    }
  };

  slugExists = async (slug: string): Promise<true | undefined> => {
    if (!this.#db) return;
    const dinosaurs = this.#db.collection<DinosaurDbSchema>("dinosaurs");
    const slugExists = await dinosaurs.findOne({
      slug,
    }, { noCursorTimeout: false });
    if (slugExists === null) {
      return;
    } else return true;
  };

  add = async (d: Dinosaur): Promise<true | undefined> => {
    if (!this.#db) return;
    const { name, slug, description, image } = d;
    const dinosaurs = this.#db.collection<DinosaurDbSchema>("dinosaurs");
    try {
      dinosaurs.insertOne({
        name: name,
        slug: slug,
        description: description,
        image: image,
      });
      logger.blueTimestamp(
        "⛳ Added a new dinosaur to database with a slug: " + slug + ".",
      );
      return true;
    } catch (e) {
      logger.red("❌ Could not add a dinosaur to database!");
    }
    return;
  };

  remove = async (s: string): Promise<true | undefined> => {
    if (!this.#db) return;
    const dinosaurs = this.#db.collection<DinosaurDbSchema>("dinosaurs");
    try {
      dinosaurs.deleteOne({
        slug: s,
      });
      logger.red("💔 Removed dinosaur with a slug " + s + " from database!");
      return true;
    } catch (e) {
      logger.red("❌ Could not remove a dinosaur from database!");
    }
    return;
  };
}
