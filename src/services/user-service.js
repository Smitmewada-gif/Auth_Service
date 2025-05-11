const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../config/serverConfig');

class UserService{
  constructor(){
    this.userRepository = new UserRepository();
  }

  async create(data){
    try {
      const user = this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service", error);
      throw error;
    }
  }

  createToken(user){
    try {
      const result = jwt.sign(user, JWT_KEY, {expiresIn: '1h'});
      return result;
    } catch (error) {
        console.log("Something went wrong while token creation");
        throw error;
    }
  }

  verifytoken(token){
    try {
      const result = jwt.verify(token, JWT_KEY);
      return result;
    } catch (error) {
        console.log("Something went wrong while token validation", error);
        throw error;
    }
  }
}

module.exports = UserService;