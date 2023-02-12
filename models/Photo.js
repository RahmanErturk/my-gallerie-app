import mongoose from "mongoose";

import Album from "./Album.js";

const schema = new mongoose.Schema(
  {
    url: {
      type: String,
      validate: {
        validator: (v) => {
          const val = v.startsWith("http") || v.startsWith("www");
          return val;
        },
        message: "Please give a valid URL",
      },
      required: true,
      unique: true,
    },
    theme: [String],

    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Photo = mongoose.model("Photo", schema);

export const getAll = async () => {
  const photos = await Photo.find().populate("albums");
  return photos;
};

export const getOne = async (photoId) => {
  const photo = await Photo.findById(photoId).populate("albums");

  return photo;
};

export const create = async (doc) => {
  const newPhoto = new Photo(doc);
  const result = await newPhoto.save();
  return result;
};

export const updateOne = async (photoId, data) => {
  const photo = await Photo.findByIdAndUpdate(photoId, data, {
    new: true,

    runValidators: true,
  });

  return photo;
};

export const replaceOne = async (photoId, data) => {
  const photo = await Photo.findOneAndReplace(
    {
      _id: photoId,
    },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  return photo;
};

export const deleteOne = async (photoId) => {
  const photo = await Photo.findByIdAndDelete(photoId);

  return photo;
};

export default Photo;
