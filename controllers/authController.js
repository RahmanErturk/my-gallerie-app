import bcrypt from "bcrypt";

import { signToken } from "../lib/token.js";
import * as authModel from "../models/User.js";

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

export const register = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  try {
    const newUser = await authModel.create({
      ...req.body,
      password: hashedPassword,
      likedPhotos: [],
      albums: [],
    });

    res.status(201).json({
      userName: newUser.userName,
      id: newUser._id,
    });
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};

export const login = async (req, res, next) => {
  // schauen ob nutzer existiert
  try {
    const user = await authModel.getOne({ email: req.body.email });

    if (!user) {
      const err = new Error("Email or password incorrect");
      err.statusCode = 400;
      throw err;
    }
    // überprpüfen des passworts
    const isPasswordEqual = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // response senden
    if (isPasswordEqual) {
      // token erstellen
      const token = signToken({ id: user._id });

      // token in einem cookie hinzufügen
      const expires = 1000 * 60 * 60 * 24;
      res.cookie("jwt", token, {
        sameSite: "lax",
        maxAge: expires,
        httpOnly: true,
      });
      res.cookie("logged_in", user._id.toString(), {
        sameSite: "lax",
        maxAge: expires,
        httpOnly: false,
      });

      res.status(200).json({
        msg: "Successfully logged in",
        id: user._id,
        email: user.email,
      });
    } else {
      const err = new Error("Email or password incorrect");
      err.statusCode = 400;
      throw err;
    }
  } catch (err) {
    return next(err);
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("logged_in");
  res.clearCookie("jwt");

  try {
    res.status(200).send();
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await authModel.getOneUser(req.params.userId);
    res.status(200).json({
      userName: user.userName,
      email: user.email,
      id: user._id,
      likedPhotos: user.likedPhotos,
      albums: user.albums,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(204).send();
    return;
  }

  try {
    const result = await authModel.updateOne(req.params.userId, req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};
