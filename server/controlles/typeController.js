const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, resp) {
    const { name } = req.body;
    const type = await Type.create({ name });

    return resp.json(type);
  }
  
  async getAll(req, resp) {
    const types = await Type.findAll();

    return resp.json(types);
  }

  async removeItem(req, res) {
    const { id } = req.params;
    const device = await Type.destroy({
      where: { id },
    });

    return res.json(device);
  }
}

module.exports = new TypeController();
