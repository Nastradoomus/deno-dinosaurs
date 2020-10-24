//import * as yup from "https://cdn.skypack.dev/pin/yup@v0.29.3-n1VXpnva4am9lQXZlFf7/yup.js";
import * as log from "https://raw.githubusercontent.com/denoland/deno/master/std/fmt/colors.ts";
import { slugify } from "../helpers/slugify.ts";

const yup = await import("https://cdn.skypack.dev/yup?dts");
/*
  ____      ____   _   _  U _____ u  __  __      _
 / __"| uU /"___| |'| |'| \| ___"|/U|' \/ '|uU  /"\  u
<\___ \/ \| | u  /| |_| |\ |  _|"  \| |\/| |/ \/ _ \/
 u___) |  | |/__ U|  _  |u | |___   | |  | |  / ___ \
 |____/>>  \____| |_| |_|  |_____|  |_|  |_| /_/   \_\
  )(  (__)_// \\  //   \\  <<   >> <<,-,,-.   \\    >>
 (__)    (__)(__)(_") ("_)(__) (__) (./  \.) (__)  (__)

*/

export default class Schema {
  name: string;
  slug: string;
  description: string;
  image?: string;
  constructor(
    name: string,
    slug: string,
    description: string,
    image?: string,
  ) {
    this.name = name;
    this.slug = slugify(slug);
    this.description = description;
    this.image = image;
    if (typeof this.image === "string") this.image = image;
  }

  async validate() {
    const schema = yup.object({
      name: yup.string().trim().min(3).required(),
      slug: yup.string().trim().min(3).required(),
      description: yup.string().trim().min(5).required(),
      image: yup.string().trim().url(),
    });

    const o = {
      "name": this.name,
      "slug": this.slug,
      "description": this.description,
      "image": this.image,
    };
    const isvalid = schema.isValid(o);
    if (await isvalid === true) {
      console.log(
        log.green(log.bold("🐉 New Dinosaur is valid")),
      );
    } else {
      schema.validate(o).catch(function (err: Record<string, unknown>) {
        console.log(log.red(log.bold("❌ Not valid: " + JSON.stringify(o))));
        console.log(log.red(log.bold("❌ " + err)));
      });
    }
    return new Promise(function (resolve, reject) {
      resolve(isvalid);
      reject(!isvalid);
    });
  }
}
