/*
  ____     _____    _   _    ____    ____
 / __"| u |_ " _|U |"|u| |U | __")u / __"| u
<\___ \/    | |   \| |\| | \|  _ \/<\___ \/
 u___) |   /| |\   | |_| |  | |_) | u___) |
 |____/>> u |_|U  <<\___/   |____/  |____/>>
  )(  (__)_// \\_(__) )(   _|| \\_   )(  (__)
 (__)    (__) (__)   (__) (__) (__) (__)
*/

// V4
import { v4 } from "https://deno.land/std/uuid/mod.ts";

//INTERFACE
import type { Dinosaur } from "../interfaces/dinosaur.ts";

let dinosaurs: Dinosaur[] = [
  {
    name: "Archosaur",
    slug: "archosaur",
    description:
      "Archosaurs are a group of diapsids and are broadly classified as reptiles. The living representatives of this group consist of birds and crocodilians. This group also includes all extinct dinosaurs, pterosaurs, and extinct close relatives of crocodilians.",
    image:
      "https://www.sciencesource.com/Doc/TR1_WATERMARKED/0/6/4/3/SS2133895.jpg",
    id: v4.generate(),
  },
  {
    name: "Tyrannosaurus",
    slug: "tyrannosaurus",
    description:
      'Tyrannosaurus[nb 1] is a genus of coelurosaurian theropod dinosaur. The species Tyrannosaurus rex (rex meaning "king" in Latin), often called T. rex or colloquially T-Rex, is one of the most well-represented of the large theropods. Tyrannosaurus lived throughout what is now western North America, on what was then an island continent known as Laramidia.',
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Tyrannosaurus_Rex_Holotype.jpg/800px-Tyrannosaurus_Rex_Holotype.jpg",
    id: v4.generate(),
  },
];

export default dinosaurs;
