const UserRepository = require("../repository/user-repository");

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
}

module.exports = UserService;