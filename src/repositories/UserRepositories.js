import fs from "fs";
import path from "path";
import user from "../boilerplate/user.js";
import UserBoilerplate from "../boilerplate/user.js";

export async function getUsers() {
   try {
      const DB = fs.readFileSync(path.join(__dirname, "../model/users.json"));

      let data = JSON.parse(DB);
      return data;
   } catch (e) {
      next(e)
   }

}

export async function addUser(req) {
   try {
      const DB = fs.readFileSync(path.join(__dirname, '../model/users.json'));

      let data = JSON.parse(DB);
      let userData = req.body;

      if (!userData) {
         return false
      }

      let userConfig = new UserBoilerplate(userData);

      data.push(userConfig);

      fs.writeFileSync(path.join(__dirname, '../model/users.json'), JSON.stringify(data));
      return userConfig;
   } catch (e) {
      throw new Error(e)
   }
}

export async function deleteUser(req) {
   try {
      const DB = fs.readFileSync(path.join(__dirname, "../model/users.json"));
      let userId = req?.params.id;

      if (!userId) {
         throw new Error("Expected user Id, got nothing.");
      }
      let data = JSON.parse(DB);
      let userToRemove = data.filter(user => user.id == userId);

      userToRemove = userToRemove[0] || null;

      data.splice(data.indexOf(userToRemove), 1);

      fs.writeFileSync(path.join(__dirname, '../model/users.json'), JSON.stringify(data));
      return data;
   } catch (e) {
      throw new Error(e)
   }
}