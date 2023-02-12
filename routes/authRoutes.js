import { Router } from "express";
import * as controller from "../controllers/authController.js";

const router = Router();

router
  .post("/register", controller.register)
  .post("/login", controller.login)
  .get("/logout", controller.logout)
  .get("/users/:userId", controller.getUser)
  .patch("/users/:userId", controller.updateUser);

export default router;
