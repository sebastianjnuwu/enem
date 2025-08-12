import express from "express";

import UserView from "#controllers/user/User";
import UserLogin from "#controllers/user/UserLogin";

const User = express.Router();


User.get("/", UserView);
User.post("/login", UserLogin);


export default User;
