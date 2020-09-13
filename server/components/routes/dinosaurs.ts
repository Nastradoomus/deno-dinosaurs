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

router
  .get("/", Controller.default)
  .get("/dinosaurs", dinosaursController.getDinosaurs)
  .post("/dinosaur", (c) => dinosaursController.addDinosaur(c))
  .get("/dinosaur/:id", (c) => {
    let id: string = "";
    if (c.params.id) id = c.params.id;
    dinosaursController.getDinosaur(c, id);
  })
  .put("/dinosaur/:id", (c) => {
    let id: string = "";
    if (c.params.id) id = c.params.id;
    dinosaursController.updateDinosaur(c, id);
  })
  .delete("/dinosaur/:id", (c) => {
    let id: string = "";
    if (c.params.id) id = c.params.id;
    dinosaursController.deleteDinosaur(c, id);
  });

export default router;
