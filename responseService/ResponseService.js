class ResponseService {
  static successMsg(res,message = 'Success',status = 200) {
    return res.status(status).json({
      success:true,
      message:message
    });
  }

  static success(res,data = null, message = 'Success', status=200) {
    return res.status(status).json({
      success:true,
      message:message,
      data:data
    });

  }
  
  static error(res,message = 'Internal Server Error', status = 500) {

    return res.status(status).json({ 
      success:false,
      message: message 
    });
  }
  
}
  
module.exports = ResponseService;
  