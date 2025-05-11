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

  app.listen(PORT, ()=>{
    console.log("Server is listening on port ", PORT);

    // const userService = new UserService();
    // const result  = userService.createToken({email: 'parth@gmail.com', id: 1});
    // console.log("token generated: ", result);
    // const verify = userService.verifytoken(result);
    // console.log("token verfication: ", verify);
  });
}

prepareAndStartServer();