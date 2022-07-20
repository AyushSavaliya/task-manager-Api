const { CustomApiError } = require("../errors/custom-errors")

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statuscode).json({ Message: err.message });
    }
    return res.status(500).json({ Message: 'somthing went worng, please try again' });
}

module.exports = errorHandlerMiddleware