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
import type {
  Context,
  Response,
} from "https://raw.githubusercontent.com/oakserver/oak/main/mod.ts";

//ENV
import dotenv from "https://raw.githubusercontent.com/AM-77/deno-dotenv/master/mod.ts";

//MONGODB
import MongoDb from "../db/db.ts";

//INTERFACE
import type { Dinosaur } from "../interfaces/dinosaur.ts";

//SCHEMA
import DinosaurSchema from "../schema/dinosaur.ts";

//CONSOLE
import * as log from "https://raw.githubusercontent.com/denoland/deno/master/std/fmt/colors.ts";

/*
U _____ u _   _  __     __
\| ___"|/| \ |"| \ \   /"/u
 |  _|" <|  \| |> \ \ / //
 | |___ U| |\  |u /\ V /_,-.
 |_____| |_| \_| U  \_/-(_/
 <<   >> ||   \\,-.//
(__) (__)(_")  (_/(__)
*/

const E = dotenv();

/*
  __  __    U  ___ u  _   _     ____    U  ___ u  ____    ____
U|' \/ '|u   \/"_ \/ | \ |"| U /"___|u   \/"_ \/ |  _"\U | __")u
\| |\/| |/   | | | |<|  \| |>\| |  _ /   | | | |/| | | |\|  _ \/
 | |  | |.-,_| |_| |U| |\  |u | |_| |.-,_| |_| |U| |_| |\| |_) |
 |_|  |_| \_)-\___/  |_| \_|   \____| \_)-\___/  |____/ u|____/
<<,-,,-.       \\    ||   \\,-._)(|_       \\     |||_  _|| \\_
 (./  \.)     (__)   (_")  (_/(__)__)     (__)   (__)_)(__) (__)
*/

const db = new MongoDb(E.SERVER, E.UN, E.PW, E.DB);

db.init();

export default {
  getDinosaurs: async ({ response }: { response: Response }) => {
    if (db.connected === true) {
      console.log(log.blue("🥅 /dinosaurs have an request!"));
      const dinosaurs = await db.list();
      response.body = {
        success: true,
        data: dinosaurs,
      };
    } else {
      console.log(
        log.red("❌ /dinosaurs *No database connection!*"),
      );
      response.body = {
        success: false,
        data: "❌ Router: No database connection!",
      };
    }
  },

  getDinosaur: async (c: Context, slug: string) => {
    if (db.connected === true) {
      const { response } = await c;
      const dinosaur = await db.listone(slug);
      console.log(log.blue(`🥅 /dinosaur/${slug} has a request!`));
      if (dinosaur) {
        response.status = 200;
        response.body = {
          success: true,
          data: dinosaur,
        };
      } else {
        console.log(
          log.red(`🐉 Requested Dinosaur not found /dinosaur/${slug}`),
        );
        c.throw(404, "🐉 Dinosaur not found");
      }
    } else {
      console.log(
        log.red(`❌ /dinosaur/${slug} *No database connection!*`),
      );
      c.response.body = {
        success: false,
        data: "❌ Router: No database connection!",
      };
    }
  },

  addDinosaur: async (c: Context) => {
    if (db.connected === true) {
      const { request, response } = await c;
      if (!request.hasBody) {
        console.log(log.red("❌ POST /dinosaur Empty JSON"));
        c.throw(400, "🧨 Empty JSON");
      } else {
        const result = await request.body();
        if (result.type === "json") {
          try {
            const data: Dinosaur = await result.value;
            const schema = new DinosaurSchema(data);
            if (await schema.validate() === true) {
              const { dinosaur } = schema;
              const { slug } = dinosaur;
              if (await db.slugExists(slug) === false) {
                if (await db.add(dinosaur) === true) {
                  response.body = {
                    success: true,
                    data: "🦕 Dinosaur added to database with a slug: " + slug +
                      "!",
                  };
                }
              } else {
                console.log("❌ Slug in use!");
                response.status = 406;
                response.body = {
                  success: false,
                  data: "❌ Slug is in use!",
                };
              }
            } else {
              console.log("❌ Validation failed!");
              response.status = 406;
              response.body = {
                success: false,
                data:
                  "❌ Data is invalid! Need a name, slug, description (and image).",
              };
            }
          } catch (err) {
            console.log(log.red("❌ POST /dinosaur Not JSON"));
            response.status = 405;
            response.body = {
              success: false,
              data: "🧨 Not a proper JSON!",
            };
          }
        } else {
          console.log(log.red("❌ POST /dinosaur Not JSON"));
          response.status = 405;
          response.body = {
            success: false,
            data: "🧨 Not a JSON!",
          };
        }
      }
    } else {
      console.log(
        log.red(`❌ POST /dinosaur *No database connection!*`),
      );
      c.response.body = {
        success: false,
        data: "❌ Router: No database connection!",
      };
    }
  },

  deleteDinosaur: async (c: Context, slug: string) => {
    if (db.connected === true) {
      const { response } = await c;
      if (await db.slugExists(slug) === true) {
        console.log("true");
        const dinosaur = await db.remove(slug);
        console.log(log.red(`🪂 /dinosaur/${slug} has been removed!`));
        if (dinosaur) {
          response.status = 200;
          response.body = {
            success: true,
            data: dinosaur,
          };
        }
      } else {
        console.log(
          log.red(
            `🐉 Requested Dinosaur for deletion not found /dinosaur/${slug}`,
          ),
        );
        c.throw(404, "🐉 Dinosaur not found");
      }
    } else {
      console.log(
        log.red(`❌ /dinosaur/${slug} *No database connection!*`),
      );
      c.response.body = {
        success: false,
        data: "❌ Router: No database connection!",
      };
    }
    /*
    const filteredDinosaurs: Array<Dinosaur> = stubDinosaurs.filter(
      (dinosaur: Dinosaur) => (dinosaur.id !== id),
    );
    if (filteredDinosaurs.length === stubDinosaurs.length) {
      response.status = 404;
      response.body = {
        success: false,
        msg: "Not found",
      };
    } else {
      stubDinosaurs.splice(0, stubDinosaurs.length);
      stubDinosaurs.push(...filteredDinosaurs);
      response.status = 200;
      response.body = {
        success: true,
        msg: `Dinosaur with id ${id} has been deleted`,
      };
    }
    */
  },

  updateDinosaur: async (c: Context, id: string) => {
    const { request, response } = c;
    /*
    const requestedDinosaur: Dinosaur | undefined = stubDinosaurs.find(
      (dinosaur: Dinosaur) => dinosaur.id === id,
    );
    if (requestedDinosaur) {
      const { value: updatedDinosaurBody } = await request.body();
      const updatedDinosaurs: Array<Dinosaur> = stubDinosaurs.map(
        (dinosaur: Dinosaur) => {
          if (dinosaur.id === id) {
            return {
              ...dinosaur,
              ...updatedDinosaurBody,
            };
          } else {
            return dinosaur;
          }
        },
      );

      stubDinosaurs.splice(0, stubDinosaurs.length);
      stubDinosaurs.push(...updatedDinosaurs);
      response.status = 200;
      response.body = {
        success: true,
        msg: `Dinosaur id ${id} updated`,
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        msg: `Not Found`,
      };
    }
    */
  },
};
