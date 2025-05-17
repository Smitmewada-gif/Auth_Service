const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const router = express.Router();
// const UserService = require('./services/user-service');

const prepareAndStartServer = ()=>{

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/api', apiRoutes);

  const {User, Role} = require("./models/index");

  app.listen(PORT, async ()=>{
    console.log("Server is listening on port ", PORT);
    
    // const u1 = await User.findByPk(1);
    // const r1 = await Role.findByPk(1);
    // u1.addRole(r1);


    // const userService = new UserService();
    // const result  = userService.createToken({email: 'parth@gmail.com', id: 1});
    // console.log("token generated: ", result);
    // const verify = userService.verifytoken(result);
    // console.log("token verfication: ", verify);
  });
}

prepareAndStartServer();