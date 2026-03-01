import { AppError } from "../utils/AppError.js";

const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const validateObjectId = (paramName = "id") => (req, res, next) => {
  const value = req.params[paramName];
  if (!uuidV4Regex.test(value)) {
    return next(new AppError("Invalid resource id", 400));
  }
  return next();
};

export { validateObjectId };
