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

const validateIsAdminRequest=  (req, res, next) =>{
  if(!req.body.userId){
    return res.status(500).json({
      data: {},
      success: false,
      message:"Something went wrong",
      error:  "User id not given"
    })
  };
  next();
}

module.exports = {
  validateUserAuth,
  validateIsAdminRequest
}