class ResponseService {
  static successMsg(message = 'Success',status = 200) {
    // return {
    //   success: true,
    //   message,
    //   status
    // };

    return res.status(status).json(message);
  }

  static success(data = null, message = 'Success', status=200) {

    return res.status(status).json(message,data);
    
    // return {
    //   success: true,
    //   data,
    //   message,
    //   status
    // };

  }
  
  static error(message = 'Internal Server Error', status = 500) {

    return res.status(status).json(message);

    // return {
    //   success: false,
    //   message,
    //   status,
    // };
  }
  
}
  
module.exports = ResponseService;
  