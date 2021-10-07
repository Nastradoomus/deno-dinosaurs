/*

  _____   __   __  ____   U _____ u ____            _      _   _    ____                     _   _     _____  U _____ u   ____      _____     _        ____ U _____ u ____
 |_ " _|  \ \ / /U|  _"\ u\| ___"|// __"| u     U  /"\  u | \ |"|  |  _"\           ___     | \ |"|   |_ " _| \| ___"|/U |  _"\ u  |" ___|U  /"\  u U /"___|\| ___"|// __"| u
   | |     \ V / \| |_) |/ |  _|" <\___ \/       \/ _ \/ <|  \| |>/| | | |         |_"_|   <|  \| |>    | |    |  _|"   \| |_) |/ U| |_  u \/ _ \/  \| | u   |  _|" <\___ \/
  /| |\   U_|"|_u |  __/   | |___  u___) |       / ___ \ U| |\  |uU| |_| |\         | |    U| |\  |u   /| |\   | |___    |  _ <   \|  _|/  / ___ \   | |/__  | |___  u___) |
 u |_|U     |_|   |_|      |_____| |____/>>     /_/   \_\ |_| \_|  |____/ u       U/| |\u   |_| \_|   u |_|U   |_____|   |_| \_\   |_|    /_/   \_\   \____| |_____| |____/>>
 _// \\_.-,//|(_  ||>>_    <<   >>  )(  (__)     \\    >> ||   \\,-.|||_       .-,_|___|_,-.||   \\,-._// \\_  <<   >>   //   \\_  )(\\,-  \\    >>  _// \\  <<   >>  )(  (__)
(__) (__)\_) (__)(__)__)  (__) (__)(__)         (__)  (__)(_")  (_/(__)_)       \_)-' '-(_/ (_")  (_/(__) (__)(__) (__) (__)  (__)(__)(_/ (__)  (__)(__)(__)(__) (__)(__)

*/

import { Response } from "https://deno.land/x/oak/mod.ts";

export interface Dinosaur {
  name: string;
  slug: string;
  description: string;
  image?: string;
  id?: string | number[];
}

export interface DinosaurDbSchema extends Dinosaur {
  _id: { $oid: string };
}

export interface DinosaurError extends Error {
  code: number;
  data: string;
  response: Response;
  slug?: string;
}

type WithSlug<P> = P & {
  slug: string;
};
