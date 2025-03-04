import { Contact } from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getAll = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const isFavorite = favorite === "true";
  const result = await Contact.find(
    { owner, favorite: isFavorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  res.json(result);
});

export const getById = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findById(id).where("owner").equals(owner);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
});

export const deleteById = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id)
    .where("owner")
    .equals(owner);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json({ message: "Deleted successfully" });
});

export const create = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
});

export const updateById = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    .where("owner")
    .equals(owner);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
});

export const updateFavorite = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    .where("owner")
    .equals(owner);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
});