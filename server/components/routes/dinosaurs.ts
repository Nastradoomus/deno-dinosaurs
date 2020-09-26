/*
   ____    U  ___ u   _   _  _____  U _____ u   ____
U |  _"\ u  \/"_ \/U |"|u| ||_ " _| \| ___"|/U |  _"\ u
 \| |_) |/  | | | | \| |\| |  | |    |  _|"   \| |_) |/
  |  _ <.-,_| |_| |  | |_| | /| |\   | |___    |  _ <
  |_| \_\\_)-\___/  <<\___/ u |_|U   |_____|   |_| \_\
  //   \\_    \\   (__) )(  _// \\_  <<   >>   //   \\_
 (__)  (__)  (__)      (__)(__) (__)(__) (__) (__)  (__)
 */

// ROUTER
import { Router } from "https://deno.land/x/oak/mod.ts";

// CONTROLLERS
import Controller from "../controllers/controller.ts";
import dinosaursController from "../controllers/dinosaurs.ts";

const router = new Router();
let id: string;

router
  .get("/", Controller.default)
  .get("/dinosaurs", dinosaursController.getDinosaurs)
  .get("/dinosaur", (c) => {
    const { response } = c;
    response.status = 405;
    response.body = {
      success: false,
      data: "❌ Check your slug!",
    };
  })
  .get("/dinosaur/:id", async (c) => {
    if (c.params.id) id = c.params.id;
    await dinosaursController.getDinosaur(c, id);
  })
  .post("/dinosaur", async (c) => dinosaursController.addDinosaur(c))
  .put("/dinosaur/:id", async (c) => {
    if (c.params.id) id = c.params.id;
    await dinosaursController.updateDinosaur(c, id);
  })
  .delete("/dinosaur/:id", async (c) => {
    if (c.params.id) id = c.params.id;
    await dinosaursController.deleteDinosaur(c, id);
  });

export default router;
