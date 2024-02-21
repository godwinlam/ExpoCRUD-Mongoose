const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controllers/userController");

//Router Object
const router = express.Router();

//Routes register || post
router.post("/register", registerController);

//Routes login || post
router.post("/login", loginController);

//Update || post
router.put("/update-user",requireSignIn ,updateUserController);

//Export
module.exports = router;
