import { HttpError } from "../utils/httpError.js";
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ error: { message: "Request body must be valid JSON" } });
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
