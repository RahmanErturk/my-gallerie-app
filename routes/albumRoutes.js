import { Router } from "express";
import * as controller from "../controllers/albumController.js";

import { postSchema } from "./albumRoutes.schema.js";
import validate from "../middlewares/validate.js";

const router = Router();

router
  .get("/", controller.getAllAlbums)
  .get("/:albumId", controller.getAlbum)
  .post("/", validate(postSchema), controller.createAlbum)
  .patch("/:albumId", controller.updateAlbum)
  .put("/:albumId", controller.replaceAlbum)
  .delete("/:albumId", controller.deleteAlbum);

export default router;
