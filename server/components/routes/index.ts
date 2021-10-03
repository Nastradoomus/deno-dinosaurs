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
import controller from "../controllers/controller.ts";
import dinosaurs from "./dinosaurs.ts";

export default new Router()
  .get("/", controller.default)
  .use("/api", dinosaurs.routes(), dinosaurs.allowedMethods());
