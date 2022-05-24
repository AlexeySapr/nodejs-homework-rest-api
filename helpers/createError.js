const statusMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const createError = (errStatus, message = statusMessages[errStatus]) => {
  const error = new Error(message);
  error.status = errStatus;
  return error;
};

module.exports = createError;
