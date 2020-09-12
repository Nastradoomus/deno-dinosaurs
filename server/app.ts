/*
  _   _       _      ____     _____    ____        _      ____      U  ___ u   U  ___ u  __  __     _   _   ____
  | \ |"|  U  /"\  u / __"| u |_ " _|U |  _"\ u U  /"\  u |  _"\      \/"_ \/    \/"_ \/U|' \/ '|uU |"|u| | / __"| u
 <|  \| |>  \/ _ \/ <\___ \/    | |   \| |_) |/  \/ _ \/ /| | | |     | | | |    | | | |\| |\/| |/ \| |\| |<\___ \/
 U| |\  |u  / ___ \  u___) |   /| |\   |  _ <    / ___ \ U| |_| |\.-,_| |_| |.-,_| |_| | | |  | |   | |_| | u___) |
  |_| \_|  /_/   \_\ |____/>> u |_|U   |_| \_\  /_/   \_\ |____/ u \_)-\___/  \_)-\___/  |_|  |_|  <<\___/  |____/>>
  ||   \\,-.\\    >>  )(  (__)_// \\_  //   \\_  \\    >>  |||_         \\         \\   <<,-,,-.  (__) )(    )(  (__)
  (_")  (_/(__)  (__)(__)    (__) (__)(__)  (__)(__)  (__)(__)_)       (__)       (__)   (./  \.)     (__)  (__)
                           ____  U _____ u _   _     U  ___ u        _       ____     ____
                          |  _"\ \| ___"|/| \ |"|     \/"_ \/    U  /"\  u U|  _"\ uU|  _"\ u
                         /| | | | |  _|" <|  \| |>    | | | |     \/ _ \/  \| |_) |/\| |_) |/
                         U| |_| |\| |___ U| |\  |u.-,_| |_| |     / ___ \   |  __/   |  __/
                          |____/ u|_____| |_| \_|  \_)-\___/     /_/   \_\  |_|      |_|
                           |||_   <<   >> ||   \\,-.    \\        \\    >>  ||>>_    ||>>_
                          (__)_) (__) (__)(_")  (_/    (__)      (__)  (__)(__)__)  (__)__)
*/
import {
  Application,
  isHttpError,
  Status,
  Router,
} from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import * as Colors from "https://deno.land/std/fmt/colors.ts";

import MongoDb from "./components/db/db.ts";
import Dinosaur from "./components/schema/schema.ts";

//Shorts
const log = Colors;

console.log(log.cyan("🦕 Welcome to Deno"));

/*
U _____ u _   _  __     __
\| ___"|/| \ |"| \ \   /"/u
 |  _|" <|  \| |> \ \ / //
 | |___ U| |\  |u /\ V /_,-.
 |_____| |_| \_| U  \_/-(_/
 <<   >> ||   \\,-.//
(__) (__)(_")  (_/(__)
*/

const E = Deno.env.toObject();
/*
  __  __    U  ___ u  _   _     ____    U  ___ u  ____    ____
U|' \/ '|u   \/"_ \/ | \ |"| U /"___|u   \/"_ \/ |  _"\U | __")u
\| |\/| |/   | | | |<|  \| |>\| |  _ /   | | | |/| | | |\|  _ \/
 | |  | |.-,_| |_| |U| |\  |u | |_| |.-,_| |_| |U| |_| |\| |_) |
 |_|  |_| \_)-\___/  |_| \_|   \____| \_)-\___/  |____/ u|____/
<<,-,,-.       \\    ||   \\,-._)(|_       \\     |||_  _|| \\_
 (./  \.)     (__)   (_")  (_/(__)__)     (__)   (__)_)(__) (__)
*/

if (!E.SERVER) E.SERVER = "localhost:27017";
const db = new MongoDb(E.SERVER, E.UN, E.PW, E.DB);
//Db.print();
db.init();

let dino = {
  name: "T-rex",
  description: "Really big!",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/9/94/Tyrannosaurus_Rex_Holotype.jpg",
};

const trex = new Dinosaur(
  dino.name,
  dino.description,
  dino.image,
);

if (await trex.validate()) {
  console.log("JEs!");
}
await db.list();
await db.add();
await db.remove();

interface Book {
  readonly id: number;
  title: string;
  author: string;
  image?: string;
}

const books = new Map<number, Book>();

books.set(0, {
  id: 0,
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

books.set(1, {
  id: 1,
  title: "Fuck off",
  author: "Conan the Cunt",
});

/*
   ____    U  ___ u   _   _  _____  U _____ u   ____
U |  _"\ u  \/"_ \/U |"|u| ||_ " _| \| ___"|/U |  _"\ u
 \| |_) |/  | | | | \| |\| |  | |    |  _|"   \| |_) |/
  |  _ <.-,_| |_| |  | |_| | /| |\   | |___    |  _ <
  |_| \_\\_)-\___/  <<\___/ u |_|U   |_____|   |_| \_\
  //   \\_    \\   (__) )(  _// \\_  <<   >>   //   \\_
 (__)  (__)  (__)      (__)(__) (__)(__) (__) (__)  (__)
 */

const router = new Router();
router
  .get("/", (c) => {
    c.response.body = "🦕 Welcome to my simple Deno server";
  })
  .get("/dinosaurs", (c) => {
    c.response.body = trex;
  })
  .get("/books", (c) => {
    c.response.body = Array.from(books.values());
  })
  .get("/book/:id", (c) => {
    if (c.params && c.params.id) {
      if (parseInt(c.params.id)) {
        const id = parseInt(c.params.id);
        if (books.has(id)) {
          c.response.body = books.get(id);
        } else {
          console.log(log.red("❌ E! False ID"));
          c.throw(404, "❌ Your stupid book isn't here!");
        }
      } else {
        console.log(log.red("❌ E! NaN"));
        c.throw(404, "🧨 That's not even a book!");
      }
    }
  })
  .post("/dinosaur", async (c) => {
    console.log(c.request.body);
    /*
    let dino = new Dinosaur()
    if (await c.request.body.validate()) {
      console.log("Good to add!");
    }
    */
  });

/*
  ____   U _____ u   ____   __     __ U _____ u
 / __"| u\| ___"|/U |  _"\ u\ \   /"/u\| ___"|/
<\___ \/  |  _|"   \| |_) |/ \ \ / //  |  _|"
 u___) |  | |___    |  _ <   /\ V /_,-.| |___
 |____/>> |_____|   |_| \_\ U  \_/-(_/ |_____|
  )(  (__)<<   >>   //   \\_  //       <<   >>
 (__)    (__) (__) (__)  (__)(__)     (__) (__)
 */

const app = new Application();

const controller = new AbortController();
const { signal } = controller;

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (c, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          // handle NotFound
          break;
        default:
          // handle other statuses
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(log.blue(
    `👂 ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  ));
});

// Later version of deno
/*
async function listenPromise() {
  app.listen({ port: 1337, signal });
}
await listenPromise;
*/

const listenPromise = app.listen({ port: 1337, signal });

await listenPromise;

//For aborting...
//controller.abort();
