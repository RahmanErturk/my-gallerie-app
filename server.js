import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import photoRouter from "./routes/photoRoutes.js";
import albumRouter from "./routes/albumRoutes.js";
import logMiddleware from "./middlewares/log.js";
import authRouter from "./routes/authRoutes.js";

import dotenv from "dotenv";
dotenv.config();

import "./lib/mongoose.js";

const app = express();
const port = process.env.PORT || 4000;

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(express.json());

app.use(cookieParser());

// app.use(logMiddleware);

app.use("/api/photos", photoRouter);
app.use("/api/albums", albumRouter);
app.use("/api/auth", authRouter);

server.use("/", express.static("./files/frontend"));
server.get("/*", (req, res) =>
  res.sendFile(__dirname + "/files/frontend/index.html")
);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
});

app.listen(port, () => console.log("App ist am start auf Port: " + port));
