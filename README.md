# 🦕 Simple Deno, Oak, MongoDB CRUD wip

1. Get deno [Deno 1.4.1](https://deno.land/#installation)
2. Get [Velociraptor](https://github.com/umbopepato/velociraptor)
3. Run vr serve

### Recommended for windows:

1. VSCode
2. [Laragon](https://laragon.org). Easy WAMP (Windows Apache, MySQL and PHP) with super easy version control for NodeJS, PHP + more. Put your MongoDB package under \laragon\bin\Mongodb start up Laragon and you're good to go.
3. Watch is broken with command prompt. I'm now using Alpine on WSL2 but watch does not recognize file changes on it. Just have to live with it for a while. Useless to repair something that is eventually going to work. Done it with Deno so many times already.

### Side notes

With Deno you should lock the imported versions but this is a WIP and done for learning purposes only. By using always the latest versions on import it is easy to keep track of all of the changes that broke the app. Most common error that you will run into is the fact that third party modules do not get updated as often as Deno would want to. Deno ups the "more strict policies" of coding so a lot of the modules do not satisfy fully Denos demoands. You need to use --no-check and --unstable -flags from time to time to skip some checks that will end up in errors.

### Going to check out [trex](https://github.com/crewdevio/Trex) next...
