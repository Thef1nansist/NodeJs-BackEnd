const BrandServices = require("../Services/brandService");

class BrandController {
  async create(req, resp) {
    return await BrandServices.create(req, resp);
  }
  
  async getAll(req, resp) {
    return await BrandServices.getAll(req, resp);
  }

  async removeItem(req, resp) {
    return await BrandServices.removeItem(req, resp);
  }
}

module.exports = new BrandController();
