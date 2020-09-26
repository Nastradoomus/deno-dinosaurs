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
  Response,
  Context,
} from "https://deno.land/x/oak/mod.ts";

//ENV
import dotenv from "https://raw.githubusercontent.com/AM-77/deno-dotenv/master/mod.ts";

//MONGODB
import MongoDb from "../db/db.ts";

// INTERFACE
import type { Dinosaur } from "../interfaces/dinosaur.ts";

// STUBS
import stubDinosaurs from "../stubs/dinosaurs.ts";

//SCHEMA
import DinosaurSchema from "../schema/dinosaur.ts";

//CONSOLE
import * as Colors from "https://deno.land/std/fmt/colors.ts";

//Shorts
const log = Colors;

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

//db.print();
db.init();

export default {
  /**
   * @description Get all dinosaurs
   * @route GET /dinosaurs
   */

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

  /**
   * @description Get dinosaur with a slug
   * @route GET /dinosaur/slug
   * @param {Context} c
   * @param {string} slug
   */

  getDinosaur: async (c: Context, slug: string) => {
    const { response } = await c;
    if (db.connected === true) {
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

  /**
   * @description Post dinosaur
   * @route POST /dinosaur
   * @param {Context} c
   */

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
            const dinosaur = await result.value;
            const { name, slug, description, image } = dinosaur;
            const schema = new DinosaurSchema(name, slug, description, image);
            if (await schema.validate() === true) {
              if (await db.checkSlug(dinosaur.slug) === true) {
                if (await db.add(dinosaur) === true) {
                  response.body = {
                    success: true,
                    data: "🦕 Dinosaur added to database!",
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
                  "❌ Data is invalid! Need name, slug, description (and image).",
              };
            }
          } catch (err) {
            console.log(log.red("❌ POST /dinosaur Not JSON"));
            response.status = 405;
            response.body = {
              success: false,
              data: "🧨 Not a proper JSON!",
            };
            //c.throw(500, "🧨 Not JSON!");
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

  deleteDinosaur: async (c: Context, id: string) => {
    const { request, response } = c;
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
  },

  updateDinosaur: async (c: Context, id: string) => {
    const { request, response } = c;
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
  },
};
