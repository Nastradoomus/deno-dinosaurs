/*
   _       U  ___ u   ____
  |"|       \/"_ \/U /"___|u
U | | u     | | | |\| |  _ /
 \| |/__.-,_| |_| | | |_| |
  |_____|\_)-\___/   \____|
  //  \\      \\     _)(|_
 (_")("_)    (__)   (__)__)

*/

import * as colors from "https://deno.land/std/fmt/colors.ts";

export default function log(property: keyof typeof colors, message: string) {
  if (Object.prototype.hasOwnProperty.call(colors, property)) {
    //console.log(colors[property](message, true));
  }
}
