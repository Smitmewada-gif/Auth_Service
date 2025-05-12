const express = require('express');
const router = express.Router();
const userController = require('../../controller/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index');

router.post("/signup", AuthRequestValidators.validateUserAuth, userController.create);
router.post("/signin",AuthRequestValidators.validateUserAuth, userController.signIn);

module.exports = router;