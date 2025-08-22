const express = require("express");
const { registerUserController, loginUserController, viewUserDetailController } = require("../controllers/userController");
const router = express.Router();
const validateUser = require("../middleware/validateUser");

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.get("/user/:id",validateUser, viewUserDetailController)


module.exports = router;