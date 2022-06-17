const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

exports.create = async function (req, resp) {
    const { name } = req.body;
    const brand = await Brand.create({ name });

    return resp.json(brand);
}

exports.getAll = async function (req, resp) {
    const brands = await Brand.findAll();

    return resp.json(brands);
}

exports.removeItem = async function (req, resp) {
    const { id } = req.params;
    const device = await Brand.destroy({
      where: { id },
    });

    return resp.json(device);
}