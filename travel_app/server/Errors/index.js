class ServerError extends Error { //clasa de erori definita custom
    constructor(message, httpStatus) {
      super(message);
      this.name = this.constructor.name;
      this.httpStatus = httpStatus;
      Error.captureStackTrace(this, this.constructor);
    }
  }

const notFound = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(err);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message
    });
};
  
  module.exports = {
    ServerError,
    notFound,
    errorHandler,
  };