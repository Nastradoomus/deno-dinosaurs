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
import { Router } from "https://deno.land/x/oak/mod.ts";

// CONTROLLERS
import dinosaursController from "../controllers/dinosaurs.ts";

let slug: string;

export default new Router()
  .get("/", dinosaursController.getDinosaurs)
  .get("/dinosaur", (c) => {
    const { response } = c;
    response.status = 405;
    response.body = {
      success: false,
      data: "❌ Check your slug!",
    };
  })
  .get("/:slug", async (c) => {
    if (c.params.slug) slug = c.params.slug;
    await dinosaursController.getDinosaur(c, slug);
  })
  .post("/", async (c) => dinosaursController.addDinosaur(c))
  .delete("/id", async (c) => {
    if (c.params.slug) slug = c.params.slug;
    await dinosaursController.deleteDinosaur(c, slug);
  })
  .put("/:slug", async (c) => {
    if (c.params.slug) slug = c.params.slug;
    await dinosaursController.updateDinosaur(c, slug);
  });
