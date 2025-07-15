// middlewares/errorMiddleware.js
const sendErrorForDev = (res, err) => {
                      res.status(err.statusCode).json({
                                            message: err.message,
                                            error: err,
                                            status: err.status,
                                            stack: err.stack,
                      });
};
const sendErrorForProd = (res, err) => {
                      res.status(err.statusCode).json({
                                            message: err.message,
                                            status: err.status,
                      });
};

const globalError = (err, req, res, next) => {
                      err.statusCode = err.statusCode || 500;
                      err.status = err.status || "error";
                      if (process.env.NODE_ENV === "development")
                                            sendErrorForDev(res, err);
                      else sendErrorForProd(res, err);
};
module.exports = globalError;
