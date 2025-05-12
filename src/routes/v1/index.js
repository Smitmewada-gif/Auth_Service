const express = require('express');
const router = express.Router();
const userController = require('../../controller/user-controller');

router.post("/signup", userController.create);
router.post("/signin", userController.signIn);

module.exports = router;