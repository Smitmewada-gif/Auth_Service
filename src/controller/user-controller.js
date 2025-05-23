const UserService = require("../services/user-service");
const userService = new UserService;

const create = async (req, res) =>{
  try {
    const user = await userService.create(
      {
        email: req.body.email, 
        password: req.body.password
      });
    return res.status(201).json({
      data: user,
      success: true,
      message: "Successfully created a user",
      error: {} 
    });
  } catch (error) {
      return res.status(error.statusCode).json({
        data: {},
        success: false,
        message: error.message,
        error: error.explanation
      });
  }
}

const signIn = async (req, res) =>{
  try {
    const response = await userService.signIn(req.body.email, req.body.password);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully logged in",
      error: {} 
    })
  } catch (error) {
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      error: error.explanation 
    });
  }
}

const isAuthenticated = async (req, res) =>{
  try {
    const token = req.headers['x-access-token'];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: response,
      success: true,
      message: "User is authenticated and user is valid",
      error: {}
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong",
      error: error 
    });
  }
}

const isAdmin = async (req, res) =>{
  try {
    const response = await userService.isAdmin(req.body.userId);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully fetched whether user is admin or not",
      error: {}
    })
  } catch (error) {
      return res.status(500).json({
        data: {},
        success: false,
        message: "Something went wrong",
        error: error 
      });
  }
}

module.exports = {create, signIn, isAuthenticated, isAdmin} ;