const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? err.statusCode || 500 : res.statusCode;
  let message = err.message || "Internal server error";
  let issues;

  if (err.code === "23505") {
    statusCode = 409;
    message = "Duplicate resource";
  }

  if (err.code === "22P02") {
    statusCode = 400;
    message = "Invalid payload";
  }

  if (err.details?.issues) {
    issues = err.details.issues;
  }

  const response = {
    message,
  };

  if (issues) {
    response.issues = issues;
  }

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export { notFound, errorHandler };
