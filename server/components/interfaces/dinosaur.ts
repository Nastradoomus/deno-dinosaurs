/*
              _   _     _____  U _____ u   ____      _____     _        ____ U _____ u ____
     ___     | \ |"|   |_ " _| \| ___"|/U |  _"\ u  |" ___|U  /"\  u U /"___|\| ___"|// __"| u
    |_"_|   <|  \| |>    | |    |  _|"   \| |_) |/ U| |_  u \/ _ \/  \| | u   |  _|" <\___ \/
     | |    U| |\  |u   /| |\   | |___    |  _ <   \|  _|/  / ___ \   | |/__  | |___  u___) |
   U/| |\u   |_| \_|   u |_|U   |_____|   |_| \_\   |_|    /_/   \_\   \____| |_____| |____/>>
.-,_|___|_,-.||   \\,-._// \\_  <<   >>   //   \\_  )(\\,-  \\    >>  _// \\  <<   >>  )(  (__)
 \_)-' '-(_/ (_")  (_/(__) (__)(__) (__) (__)  (__)(__)(_/ (__)  (__)(__)(__)(__) (__)(__)
*/

export interface Dinosaur {
  name: string;
  slug: string;
  description: string;
  image?: string;
  id?: string | number[];
}

export interface DbSchema extends Dinosaur {
  _id: { $oid: string };
}
