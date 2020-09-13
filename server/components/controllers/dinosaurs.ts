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
import { Response, Context } from "https://deno.land/x/oak/mod.ts";

// INTERFACE
import Dinosaur from "../interfaces/dinosaur.ts";

// STUBS
import dinosaurs from "../stubs/dinosaurs.ts";

//CONSOLE
import * as Colors from "https://deno.land/std/fmt/colors.ts";

//Shorts
const log = Colors;

export default {
  /**
   * @description Get all dinosaurs
   * @route GET /dinosaurs
   */

  getDinosaurs: ({ response }: { response: Response }) => {
    response.body = {
      success: true,
      data: dinosaurs,
    };
  },

  getDinosaur: async (c: Context, id: string) => {
    const selected: Dinosaur | undefined = dinosaurs.find((dino) =>
      dino.id === id
    );
    const { response } = await c;
    if (selected) {
      response.status = 200;
      response.body = {
        success: true,
        data: selected,
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        data: "🐉 Dinosaur not found",
      };
      console.log(log.red(
        "🐉 Requested Dinosaur not found with id:" + id,
      ));
    }
  },

  addDinosaur: async (c: Context) => {
    const { request, response } = await c;
    if (!request.hasBody) {
      c.throw(400, "🧨 Empty data JSON");
    } else {
      const result = await request.body();
      if (result.type === "json") {
        const value = await result.value;
        console.log(value);
        response.body = {
          success: true,
          data: value,
        };
      } else {
        c.throw(400, "🧨 That's not JSON!");
      }
    }
  },
  /*
    { request, response }: { request: Request; response: Response },
  ) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No data",
      };
    } else {
      const result = await request.body();
      if (result.type === "json") {
        const value = await result.value;
        console.log(value);
      } else c.throw(404, "🧨 That's not JSON!");
      /*
      const Dinosaur: Dinosaur = dinosaurBody;
      Dinosaur.id = v4.generate();
      dinosaurs.push(Dinosaur);
      */
  /*
      response.status = 201;
      response.body = {
        success: true,
        //data: dinosaurBody,
        //data: Dinosaur,
      };
    }
    */

  deleteDinosaur: async (c: Context, id: string) => {
    const { request, response } = c;
    const filteredDinosaurs: Array<Dinosaur> = dinosaurs.filter(
      (dinosaur: Dinosaur) => (dinosaur.id !== id),
    );
    if (filteredDinosaurs.length === dinosaurs.length) {
      response.status = 404;
      response.body = {
        success: false,
        msg: "Not found",
      };
    } else {
      dinosaurs.splice(0, dinosaurs.length);
      dinosaurs.push(...filteredDinosaurs);
      response.status = 200;
      response.body = {
        success: true,
        msg: `Dinosaur with id ${id} has been deleted`,
      };
    }
  },

  updateDinosaur: async (c: Context, id: string) => {
    const { request, response } = c;
    const requestedDinosaur: Dinosaur | undefined = dinosaurs.find(
      (dinosaur: Dinosaur) => dinosaur.id === id,
    );
    if (requestedDinosaur) {
      const { value: updatedDinosaurBody } = await request.body();
      const updatedDinosaurs: Array<Dinosaur> = dinosaurs.map(
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

      dinosaurs.splice(0, dinosaurs.length);
      dinosaurs.push(...updatedDinosaurs);
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
