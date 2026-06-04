const { Router } = require("express")

const loginController = require("../controllers/users")

const loginRouter = Router()

loginRouter.get("/:username", loginController.show)
loginRouter.post("/register", loginController.create)
loginRouter.post("/login", loginController.login)

module.exports = loginRouter