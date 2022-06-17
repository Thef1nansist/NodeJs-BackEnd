const BasketServices = require("../Services/basketService");

class BasketController {
  async create(req, resp, next) {
   return await BasketServices.create(req, resp, next);
  }

  async getAllForUser(req, resp) {
    return await BasketServices.getAllBasket(req, resp);
  }

  async RemoveItem(req, resp) {
    return await BasketServices.removeDevice(req, resp);
  }
}

module.exports = new BasketController();
