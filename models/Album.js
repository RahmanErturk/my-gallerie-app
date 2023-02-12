import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    date: Date,
    creator: String,
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Album = mongoose.model("Album", schema);

export const getAll = async () => {
  const albums = await Album.find().populate("photos");
  return albums;
};

export const getOne = async (albumId) => {
  const album = await Album.findById(albumId).populate("photos");

  return album;
};

export const create = async (doc) => {
  const newAlbum = new Album(doc);
  const result = await newAlbum.save();
  return result;
};

export const updateOne = async (albumId, data) => {
  const album = await Album.findByIdAndUpdate(albumId, data, {
    new: true,

    runValidators: true,
  });

  return album;
};

export const replaceOne = async (albumId, data) => {
  const album = await Album.findOneAndReplace(
    {
      _id: albumId,
    },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  return album;
};

export const deleteOne = async (albumId) => {
  const album = await Album.findByIdAndDelete(albumId);

  return album;
};

export default Album;
