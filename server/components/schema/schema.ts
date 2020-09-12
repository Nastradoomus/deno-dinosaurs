import * as yup from "https://cdn.skypack.dev/pin/yup@v0.29.3-ZzqjmuxJFzKiUPDYHsl3/min/yup.js";
import * as Colors from "https://deno.land/std/fmt/colors.ts";

/*
  ____      ____   _   _  U _____ u  __  __      _
 / __"| uU /"___| |'| |'| \| ___"|/U|' \/ '|uU  /"\  u
<\___ \/ \| | u  /| |_| |\ |  _|"  \| |\/| |/ \/ _ \/
 u___) |  | |/__ U|  _  |u | |___   | |  | |  / ___ \
 |____/>>  \____| |_| |_|  |_____|  |_|  |_| /_/   \_\
  )(  (__)_// \\  //   \\  <<   >> <<,-,,-.   \\    >>
 (__)    (__)(__)(_") ("_)(__) (__) (./  \.) (__)  (__)

*/

//Shorts
const log = Colors;

export default class Schema {
  name: string;
  description: string;
  image?: string;
  id?: number;
  //#valid: boolean = false;
  constructor(
    name: string,
    description: string,
    image?: string,
    id?: number,
  ) {
    this.name = name;
    this.description = description;
    if (this.image) this.image = image;
    if (this.id) this.id = id;
  }

  async validate() {
    const schema = yup.object({
      name: yup.string().trim().min(2).required(),
      description: yup.string().trim().min(3).required(),
      image: yup.string().trim().url(),
    });
    const o = {
      "name": this.name,
      "description": this.description,
      "image": this.image,
    };
    const isvalid = schema.isValid(o);
    if (await isvalid === true) {
      //this.#valid = true;
      console.log(
        log.green(log.bold("🐉 Dinosaur is valid")),
      );
    } else {
      schema.validate(o).catch(function (err: Record<string, unknown>) {
        console.log(log.red(log.bold("❌ Not valid: " + JSON.stringify(o))));
        console.log(log.red(log.bold("❌ " + err)));
      });
    }
    return new Promise(function (resolve, reject) {
      resolve(isvalid);
    });
  }
}
