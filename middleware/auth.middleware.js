import { ValidateUserToken } from "../utils/token.js";

export function authenticationMiddeleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next();

  if (!authHeader.startsWith("Bearer"))
    return res
      .status(400)
      .json({ error: ` authentication must start woth brearer` });
  const [_, token] = authHeader.split(" ");
  const payload = ValidateUserToken(token);
  req.user = payload;
  next();
}
export function ensureAuthenticated(req, res, next) {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ error: ` You must be logged in to access this resourse` });
  }
  next()
}
