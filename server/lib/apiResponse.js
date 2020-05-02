const apiResponse = (statusCode, message, data = null) => {
  return {
    statusCode,
    message,
    data
  }
}

module.exports = apiResponse