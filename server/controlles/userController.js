const UserServices = require("../Services/userService");

class UserController {
  async registration(req, resp, next) {
    return await UserServices.registration(req, resp, next);
  }

  async login(req, res, next) {
    return await UserServices.login(req, res, next);
  }

  check(req, res, next) {
    return UserServices.check(req, res, next);
  }
}

module.exports = new UserController();
