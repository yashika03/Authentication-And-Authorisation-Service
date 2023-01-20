const {StatusCodes} = require('http-status-codes');
class AppError extends Error {
    constructor(name = 'AppError', message = 'Something Went wrong', explanation = 'Something Went wrong', statusCode = StatusCodes.INTERNAL_SERVER_ERROR)
    {
        super();
        this.name=name,
        this.message=message,
        this.explanation=explanation,
        this.statusCode=statusCode
    }
}
module.exports = AppError;