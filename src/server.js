import express from "express";
import cors from "cors";

import { getUsers, addUser, deleteUser } from "./repositories/UserRepositories";
import { next } from "sucrase/dist/parser/tokenizer";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
   origin: "*",
   optionsSuccessStatus: 200
}));

app.listen(3333);

// routes
app.get("/api/v1/users", async (req, res) => {
   const users = await getUsers();

   res.json({ users });
})

app.delete("/api/v1/user/delete/:id", async (req, res) => {
   try {
      const users = await deleteUser(req);

      res.status(201).json({ users });
   } catch (err) {
      console.log(err);
      next(err)
   }
})

app.post("/api/v1/user/create", async (req, res, next) => {
   try {
      const newUser = await addUser(req);

      if (!newUser) {
         res.status(404).json({ user: {} })
         throw new Error("404");
      }

      res.status(201).json({ user: newUser });
   } catch (err) {
      next(err)
   }
})