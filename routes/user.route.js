const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const isActivated = require("../middlewares/isActivated.middleware");

const router = Router();

router.get("/get-users", authMiddleware, isActivated, userController.getUsers);
router.get("/:id", authMiddleware, userController.getUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
