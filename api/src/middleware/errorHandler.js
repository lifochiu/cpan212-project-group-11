import { HttpError } from "../utils/httpError.js";
import mongoose from "mongoose";

function getFieldError(err) {
  if (err instanceof mongoose.Error.ValidationError) {
    return Object.entries(err.errors);
  }
  if (err instanceof mongoose.Error.CastError) {
    return [[err.path, err]];
  }
  return null;
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ error: { message: "Request body must be valid JSON" } });
  }

  const fieldErrors = getFieldError(err);
  if (fieldErrors) {
    const details = {};
    for (const [path, fieldError] of fieldErrors) {
      details[path] =
        fieldError.name === "CastError"
          ? `${path} has an invalid value`
          : fieldError.message;
    }
    return res
      .status(400)
      .json({ error: { message: "Validation failed", details } });
  }

  const status = err.status ?? 500;

  const expected = err instanceof HttpError || status < 500;
  if (!expected) {
    console.error(err);
  }
  res.status(status).json({
    error: {
      message: expected ? err.message : "Internal server error",
      details: err.details,
    },
  });
}
