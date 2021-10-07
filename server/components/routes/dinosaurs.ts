/*
  ____              _   _     U  ___ u  ____       _       _   _    ____           ____    U  ___ u   _   _  _____  U _____ u   ____
 |  _"\    ___     | \ |"|     \/"_ \/ / __"| uU  /"\  uU |"|u| |U |  _"\ u     U |  _"\ u  \/"_ \/U |"|u| ||_ " _| \| ___"|/U |  _"\ u
/| | | |  |_"_|   <|  \| |>    | | | |<\___ \/  \/ _ \/  \| |\| | \| |_) |/      \| |_) |/  | | | | \| |\| |  | |    |  _|"   \| |_) |/
U| |_| |\  | |    U| |\  |u.-,_| |_| | u___) |  / ___ \   | |_| |  |  _ <         |  _ <.-,_| |_| |  | |_| | /| |\   | |___    |  _ <
 |____/ uU/| |\u   |_| \_|  \_)-\___/  |____/>>/_/   \_\ <<\___/   |_| \_\        |_| \_\\_)-\___/  <<\___/ u |_|U   |_____|   |_| \_\
  |||_.-,_|___|_,-.||   \\,-.    \\     )(  (__)\\    >>(__) )(    //   \\_       //   \\_    \\   (__) )(  _// \\_  <<   >>   //   \\_
 (__)_)\_)-' '-(_/ (_")  (_/    (__)   (__)    (__)  (__)   (__)  (__)  (__)     (__)  (__)  (__)      (__)(__) (__)(__) (__) (__)  (__)
 */

// ROUTER
import { Response, Router } from "https://deno.land/x/oak/mod.ts";

//LOG
import { red } from "https://deno.land/std/fmt/colors.ts";

//CONTROLLERS
import dinosaursController from "../controllers/dinosaurs.ts";

//TYPES
import { DinosaurError } from "../types/types.d.ts";

//LOGGER
import * as logger from "../../../common/log.ts";

function errorResponse(e: DinosaurError, response: Response): void {
  const success = false;
  const { data } = e;
  logger.redTimestamp(red("❌ " + e));
  response.body = { success, data };
}

export default new Router()
  .delete("/:slug", async (ctx) => {
    try {
      await dinosaursController.deleteDinosaur(ctx);
    } catch (e) {
      errorResponse(e, ctx.response);
    }
  })
  .get("/", async (ctx) => {
    try {
      await dinosaursController.getDinosaurs(ctx);
    } catch (e) {
      errorResponse(e, ctx.response);
    }
  })
  .get("/:slug", async (ctx) => {
    try {
      await dinosaursController.getDinosaur(ctx);
    } catch (e) {
      errorResponse(e, ctx.response);
    }
  })
  .post("/", async (ctx) => {
    try {
      await dinosaursController.addDinosaur(ctx);
    } catch (e) {
      errorResponse(e, ctx.response);
    }
  })
  .put("/:slug", async (ctx) => {
    try {
      await dinosaursController.updateDinosaur(ctx);
    } catch (e) {
      errorResponse(e, ctx.response);
    }
  });
