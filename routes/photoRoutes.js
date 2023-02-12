import { Router } from "express";
import * as controller from "../controllers/photoController.js";

import { postSchema } from "./photoRoutes.schema.js";
import validate from "../middlewares/validate.js";

const router = Router();

router
  .get("/", controller.getAllPhotos)
  .get("/:photoId", controller.getPhoto)
  .post("/", validate(postSchema), controller.createPhoto)
  .patch("/:photoId", validate(postSchema), controller.updatePhoto)
  .put("/:photoId", validate(postSchema), controller.replacePhoto)
  .delete("/:photoId", controller.deletePhoto);

export default router;
