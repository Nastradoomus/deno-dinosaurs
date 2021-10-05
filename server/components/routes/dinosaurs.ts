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
// CONTROLLERS
import dinosaursController from "../controllers/dinosaurs.ts";

import { DinosaurError } from "../typings/typings.ts";

function errorResponse(e: DinosaurError, response: Response): void {
  console.log(red("❌ " + e));
  const { success, data } = e;
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
  .get("/", dinosaursController.getDinosaurs)
  .get("/:slug", async (ctx) => {
    try {
      await dinosaursController.getDinosaur(ctx);
    } catch (e) {
      errorResponse(e, ctx.response);
    }
  })
  .post("/", async (ctx) => dinosaursController.addDinosaur(ctx))
  .put("/:slug", async (ctx) => {
    await dinosaursController.updateDinosaur(ctx);
  });
