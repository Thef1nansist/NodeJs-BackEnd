const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, resp) {
    const { name } = req.body;
    const brand = await Brand.create({ name });

    return resp.json(brand);
  }
  
  async getAll(req, resp) {
    const brands = await Brand.findAll();

    return resp.json(brands);
  }

  async removeItem(req, res) {
    const { id } = req.params;
    const device = await Brand.destroy({
      where: { id },
    });

    return res.json(device);
  }
}

module.exports = new BrandController();
