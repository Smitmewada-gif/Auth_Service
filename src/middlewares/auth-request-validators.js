const validateUserAuth = (req, res, next) =>{
  if(!req.body.email || !req.body.password){
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong",
      error : "Email or password missing in the request"
    });
  }
  next();
}

module.exports = {
  validateUserAuth
}