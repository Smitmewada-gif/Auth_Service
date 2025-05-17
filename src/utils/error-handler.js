const {StatusCodes} = require('http-status-codes');
class AppErros extends Error{
  constructor(
    name = 'AppError', 
    message = 'Somthing went wrong', 
    explanation = 'Somthing went wrong', 
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ){
    super()
    this.message = message,
    this.explanation = explanation,
    this.name = name,
    this.statusCode = statusCode
  }
}

module.exports = AppErros;