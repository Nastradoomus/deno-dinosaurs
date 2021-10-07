# 🦕 Simple Deno, Oak, MongoDB CRUD wip

## 1. Get deno [Deno](https://deno.land/#installation)
### 2. Get [Velociraptor](https://github.com/umbopepato/velociraptor)
### 3. Fill .env from .env.example (See Heroku for additional information)
### 4. Run vr serve

---

#### Description
Package does not have any version locks in imports which means that things will break after time. This behaviour is intentional as this is a WIP learning experience. It is pretty fun to return to this project after a time and fix all of the broken things.

---

### Todos

#### Environment
- [ ] Connect to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/)
- [ ] Agile development with [Deno Deploy](https://deno.com/deploy/)

#### Frontend
- [ ] Vue ([VNO](https://deno.land/x/vno))
- [ ] React ([Ultra](https://deno.land/x/ultra)) / Preact
- [ ] Svelte ([Snel](https://deno.land/x/snel))
- [ ] [Fre](https://deno.land/x/fre)
- [ ] Angluar
- [ ] Alpinejs


#### For Heroku deploy
- For non Heroku deployment leave HEROKUAPP_URL as undefined
- Set Heroku environment variables (env.example).
- Set Heroku app url.
- Skip LOCAL or set it to false