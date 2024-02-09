import express from "express";
import {
  getAll,
  getById,
  deleteById,
  create,
  updateById,
  updateFavorite,
} from "../controllers/contacts.js";
import { schemas } from "../models/contact.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAll);

contactsRouter.get("/:id", authenticate, isValidId, getById);

contactsRouter.delete("/:id", authenticate, isValidId, deleteById);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createContactSchema),
  create
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateContactSchema),
  updateById
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

export default contactsRouter;