const TypeServices = require("../Services/typeService");

class TypeController {
  async create(req, resp) {
    return await TypeServices.create(req, resp);
  }
  
  async getAll(req, resp) {
    return await TypeServices.getTypes(req, resp);
  }

  async removeItem(req, resp) {
    return await TypeServices.removeType(req, resp);
  }
}

module.exports = new TypeController();
