/*
 __     __    _   _ U _____ u
 \ \   /"/uU |"|u| |\| ___"|/
  \ \ / //  \| |\| | |  _|"
  /\ V /_,-. | |_| | | |___
 U  \_/-(_/ <<\___/  |_____|
   //      (__) )(   <<   >>
  (__)         (__) (__) (__)
 */

// ROUTER
import { Router } from "https://deno.land/x/oak/mod.ts";
//"https://deno.land/x/oak@v9.0.1/mod.ts";

// CONTROLLERS
import vueController from "../controllers/vue.ts";

export default new Router().get("/", vueController.init);
