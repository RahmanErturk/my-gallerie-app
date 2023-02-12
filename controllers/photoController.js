import * as Photo from "../models/Photo.js";
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

export const createPhoto = async (req, res) => {
  try {
    const result = await Photo.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

export const getAllPhotos = async (req, res, next) => {
  try {
    const result = await Photo.getAll();
    res.status(200).json(result);
  } catch (err) {
    next(errorSwitch(err));
  }
};

export const getPhoto = async (req, res, next) => {
  try {
    const result = await Photo.getOne(req.params.photoId);
    res.status(200).json(result);
  } catch (err) {
    next(errorSwitch(err));
  }
};

export const updatePhoto = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(204).send();
    return;
  }

  try {
    const result = await Photo.updateOne(req.params.photoId, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(errorSwitch(err));
  }
};

export const replacePhoto = async (req, res, next) => {
  try {
    const result = await Photo.replaceOne(req.params.photoId, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(errorSwitch(err));
  }
};

export const deletePhoto = async (req, res, next) => {
  try {
    await Photo.deleteOne(req.params.photoId);
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
