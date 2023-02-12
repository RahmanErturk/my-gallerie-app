import { verifyToken } from "../lib/token.js";

function checkToken(req, res, next) {
  const token = req.cookies.loggedIn;

  try {
    const payload = verifyToken(token);
    // console.log(payload.role);
    // req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).end();
  }
}

export default checkToken;
