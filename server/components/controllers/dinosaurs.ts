/*
  ____              _   _     U  ___ u  ____       _       _   _    ____           ____   U  ___ u  _   _     _____    ____    U  ___ u   _       _     U _____ u   ____
 |  _"\    ___     | \ |"|     \/"_ \/ / __"| uU  /"\  uU |"|u| |U |  _"\ u     U /"___|   \/"_ \/ | \ |"|   |_ " _|U |  _"\ u  \/"_ \/  |"|     |"|    \| ___"|/U |  _"\ u
/| | | |  |_"_|   <|  \| |>    | | | |<\___ \/  \/ _ \/  \| |\| | \| |_) |/     \| | u     | | | |<|  \| |>    | |   \| |_) |/  | | | |U | | u U | | u   |  _|"   \| |_) |/
U| |_| |\  | |    U| |\  |u.-,_| |_| | u___) |  / ___ \   | |_| |  |  _ <        | |/__.-,_| |_| |U| |\  |u   /| |\   |  _ <.-,_| |_| | \| |/__ \| |/__  | |___    |  _ <
 |____/ uU/| |\u   |_| \_|  \_)-\___/  |____/>>/_/   \_\ <<\___/   |_| \_\        \____|\_)-\___/  |_| \_|   u |_|U   |_| \_\\_)-\___/   |_____| |_____| |_____|   |_| \_\
  |||_.-,_|___|_,-.||   \\,-.    \\     )(  (__)\\    >>(__) )(    //   \\_      _// \\      \\    ||   \\,-._// \\_  //   \\_    \\     //  \\  //  \\  <<   >>   //   \\_
 (__)_)\_)-' '-(_/ (_")  (_/    (__)   (__)    (__)  (__)   (__)  (__)  (__)    (__)(__)    (__)   (_")  (_/(__) (__)(__)  (__)  (__)   (_")("_)(_")("_)(__) (__) (__)  (__)
*/

// REQUEST & RESPONSE
import type {
  Response,
  RouteParams,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

//MONGODB
import MongoConnector from "../db/mongoConnector.ts";

//ENV
import { parseDBEnv } from "../../../common/env.ts";

//SCHEMA
import DinosaurSchema from "../schema/dinosaur.ts";

//TYPES
import { Dinosaur, DinosaurDbSchema } from "../types/types.d.ts";

//LOGGER
import * as logger from "../../../common/log.ts";

const env = parseDBEnv();
const db = new MongoConnector<DinosaurDbSchema>(
  env.SERVER,
  env.UN,
  env.PW,
  env.DB,
);

function successResponse<T>(
  message: string,
  data: T,
  response: Response,
): void {
  const success = true;
  logger.greenTimestamp("🦕 " + message);
  response.body = { success, data };
}

function throwRouterError(
  code: number,
  message: string,
  ctx: RouterContext<RouteParams, Record<string, any>>,
  slug?: string | undefined,
): void {
  const data = code + ", " + message;
  ctx.throw(code, data, {
    code,
    data,
    slug,
  });
}

export default {
  getDinosaurs: async (
    ctx: RouterContext<RouteParams, Record<string, any>>,
  ) => {
    if (db.connected) {
      logger.blueTimestamp("⚡ /api have a request!");
      const dinosaurs = await db.list<DinosaurDbSchema[]>();
      if (dinosaurs) {
        successResponse<DinosaurDbSchema[]>(
          "Found dinosaurs!",
          dinosaurs,
          ctx.response,
        );
      }
    } else {
      throwRouterError(500, "No database connection 🐉 @/api", ctx);
    }
  },

  getDinosaur: async (ctx: RouterContext<RouteParams, Record<string, any>>) => {
    const slug = ctx.params.slug as string;
    if (db.connected) {
      //!
      const { response } = ctx;
      logger.blueTimestamp(`⚡ /api/${slug} has a request!`);
      const dinosaur = await db.listOneWithSlug<DinosaurDbSchema>(slug);
      if (dinosaur) {
        response.body = {
          data: dinosaur,
        };
      } else {
        throwRouterError(404, "🐉 @/api/" + slug + " not found...", ctx, slug);
      }
    } else {
      const data = "500, No database connection 🐉 @/api/" + slug;
      ctx.throw(500, data, {
        slug,
        code: 500,
        success: false,
        data,
      });
    }
  },

  addDinosaur: async (ctx: RouterContext<RouteParams, Record<string, any>>) => {
    if (db.connected) {
      const { request, response } = ctx;
      if (!request.hasBody) {
        logger.red("❌ POST /api Empty JSON");
        ctx.throw(400, "🧨 Empty JSON");
      } else {
        const result = request.body(); //await?
        if (result.type === "json") {
          try {
            const data: Dinosaur = await result.value;
            const schema = new DinosaurSchema(data);
            if (await schema.validate()) {
              const { dinosaur } = schema;
              const { slug } = dinosaur;
              if (!await db.slugExists(slug)) {
                if (await db.add(dinosaur)) {
                  response.body = {
                    success: true,
                    data: "🦕 Dinosaur added to database with a slug: " + slug +
                      "!",
                  };
                }
              } else {
                logger.red("❌ Slug in use!");
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
            logger.red("❌ POST /api Not JSON");
            response.status = 405;
            response.body = {
              success: false,
              data: "🧨 Not a proper JSON!",
            };
          }
        } else {
          logger.red("❌ POST /api Not JSON");
          response.status = 405;
          response.body = {
            success: false,
            data: "🧨 Not a JSON!",
          };
        }
      }
    } else {
      logger.red(`❌ POST /api *No database connection!*`),
        ctx.response.body = {
          success: false,
          data: "❌ Router: No database connection!",
        };
    }
  },

  deleteDinosaur: async (
    ctx: RouterContext<RouteParams, Record<string, any>>,
  ) => {
    const slug = ctx.params.slug as string;
    if (db.connected) {
      const { response } = ctx;
      if (await db.slugExists(slug) === true) {
        console.log("true");
        const dinosaur = await db.remove(slug);
        logger.red(`🪂 /api/${slug} has been removed!`);
        if (dinosaur) {
          response.body = {
            data: dinosaur,
          };
        }
      } else {
        const data = "Response code 404. 🐉 Dinosaur /api/" + slug +
          " not found. Impossible to delete...";
        ctx.throw(404, data, {
          slug,
          code: 404,
          success: false,
          data,
        });
      }
    } else {
      logger.red(`❌ /api/${slug} No database connection!`),
        ctx.response.body = {
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

  updateDinosaur: async (
    ctx: RouterContext<RouteParams, Record<string, any>>,
  ) => {
    const { request, response } = ctx;
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
