import * as Album from "../models/Album.js";
import { faker } from "@faker-js/faker";

const errorSwitch = (err) => {
  switch (err.path) {
    case "_id":
      err.statusCode = 404;
      err.message = "Not Found";
      break;
    default:
      err.statusCode = 400;
      err.message = "Check your entry.";
  }

  return err;
};

export const createAlbum = async (req, res) => {
  try {
    const result = await Album.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

export const getAllAlbums = async (req, res, next) => {
  try {
    const result = await Album.getAll();
    res.status(200).json(result);
  } catch (err) {
    next(errorSwitch(err));
  }
};

export const getAlbum = async (req, res, next) => {
  try {
    const result = await Album.getOne(req.params.albumId);
    res.status(200).json(result);
  } catch (err) {
    next(errorSwitch(err));
  }
};

export const updateAlbum = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(204).send();
    return;
  }

  try {
    const result = await Album.updateOne(req.params.albumId, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(errorSwitch(err));
  }
};

export const replaceAlbum = async (req, res, next) => {
  try {
    const result = await Album.replaceOne(req.params.albumId, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(errorSwitch(err));
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    await Album.deleteOne(req.params.albumId);
    res.status(204).send();
  } catch (err) {
    next(errorSwitch(err));
  }
};

// export const createFake = async (req, res) => {
//   const data = {
//     price: faker.commerce.price(),
//     url: faker.image.imageUrl(1234, 2345, undefined, true),
//     date: faker.date.past(),
//     theme: faker.word.noun(),
//   };

//   const result = await Photo.create(data);
//   res.status(201).json(result);
// };
