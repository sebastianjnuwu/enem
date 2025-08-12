import express from "express";

import UserView from "#controllers/user/User";
import UserLogin from "#controllers/user/UserLogin";
import UserUpdate from "#controllers/user/UserUpdate";

const User = express.Router();

User.get("/", UserView);
User.post("/login", UserLogin);
User.post("/update", UserUpdate);

export default User;
