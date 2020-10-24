//INTERFACE
import type { Dinosaur } from "../interfaces/dinosaur.ts";

//LOG
import * as log from "https://raw.githubusercontent.com/denoland/deno/master/std/fmt/colors.ts";

//SLUGIFY
import { slugify } from "../helpers/slugify.ts";

//YUP
import * as yup from "https://cdn.skypack.dev/yup?dts";

//SANITIZE
import { XmlEntities as Sanitize } from "https://deno.land/x/html_entities@v1.0/mod.js";

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
  dinosaur: Dinosaur;
  constructor(
    dinosaur: Dinosaur,
  ) {
    this.dinosaur = dinosaur;
  }

  async validate() {
    const schema = yup.object({
      name: yup.string().trim().min(3).required(),
      slug: yup.string().trim().min(3).required(),
      description: yup.string().trim().min(5).required(),
      image: yup.string().trim().url(),
    });
    const { name, slug, description, image } = this.dinosaur;
    const o = {
      "name": name,
      "slug": slug,
      "description": description,
      "image": image,
    };
    const isvalid = schema.isValid(o);
    if (await isvalid === true) {
      console.log(
        log.green(
          log.bold(
            "🐉 New Dinosaur is valid. Sanitizing data and creating slug...",
          ),
        ),
      );
      this.dinosaur.slug = slugify(slug);
      this.dinosaur.name = Sanitize.encode(name);
      this.dinosaur.description = Sanitize.encode(description);
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
