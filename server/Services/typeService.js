const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

exports.create = async function (req, resp) {
    const { name } = req.body;
    const type = await Type.create({ name });

    return resp.json(type);
}

exports.getTypes = async function (req, resp) {
    const types = await Type.findAll();

    return resp.json(types);
} 

exports.removeType = async function (req, resp) {
    const { id } = req.params;
    const device = await Type.destroy({
      where: { id },
    });

    return resp.json(device);
} 