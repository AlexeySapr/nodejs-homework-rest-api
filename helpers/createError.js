const statusMessages = {
  400: "Bad request",
  404: "Not found",
};

const createError = (errStatus, message = statusMessages[errStatus]) => {
  const error = new Error(message);
  error.status = errStatus;
  return error;
};

module.exports = createError;
