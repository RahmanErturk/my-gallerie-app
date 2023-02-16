import { Schema, model } from "mongoose";

const albumSchema = new Schema(
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
        type: Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    likedPhotos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
    albums: [albumSchema],
  },
  {
    versionKey: false,
  }
);

const userModel = model("User", userSchema);

export const create = async (data) => {
  const newUser = await userModel.create(data);
  return newUser;
};

export const getOne = async (filter) => {
  const result = await userModel.findOne(filter);
  return result;
};

export const getOneUser = async (userId) => {
  const user = await userModel.findById(userId);
  return user;
};

export const updateOne = async (albumId, data) => {
  const album = await userModel.findByIdAndUpdate(albumId, data, {
    new: true,
    runValidators: true,
  });

  return album;
};

export const deleteOne = async (userId) => {
  const result = await userModel.findByIdAndDelete(userId);

  return result;
};
