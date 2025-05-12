const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

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

  async signIn(email, password){
    try {

      const user = await this.userRepository.getbyEmail(email);
      const passwordsMatch = this.checkPassword(password, user.password);

      if(!passwordsMatch){
        console.log("Password dosent match");
        throw {error: 'Incorrect password'}; 
      }

      const newJWT = this.createToken({email: user.email, id: user.id});
      return newJWT;
    } catch (error) {
      console.log("Something went wrong in sign in process", error);
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
        throw {message: "Invalid token"};
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword){
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword); 
    } catch (error) {
        console.log("Something went wrong while password verification", error);
        throw error;
    }
  }

  async isAuthenticated(token){
    try {
      const response = this.verifytoken(token);
      if(!response){
        throw {error: 'Invalid token'};
      }

      /*  suppose a user signs in to our app, he will be assigned a token.
          the expiry of the token is '1d', but if user deletes their account
          before token expiration so in this case we should not allow api access 
          through this token. thefore we first check if user is present or not.
      */
     
      const user = await this.userRepository.getById(response.id);

      if(!user){
        throw {error: 'No user with the corresponding token exists'};
      }

      return user.id;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;