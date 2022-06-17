const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

exports.create = async function (req, resp, next) {
    try {
        const { name, price, brandId, typeId, info } = req.body;
  
        let { img } = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
  
        const device = await Device.create({
          name,
          price,
          brandId,
          typeId,
          img: fileName,
        });
  
        if (info != null) {
          let infoObj = JSON.parse(info);
          infoObj.forEach(({ title, description }) =>
            DeviceInfo.create({
              title: title,
              description: description,
              deviceId: device.id,
            })
          );
        }
  
        return resp.json(device);
      } catch (error) {
        console.log(error);
        next(ApiError.badRequest(error.message));
      }
}

exports.update = async function (req, resp, next) {
    try {
        const { id, name, price } = req.body;
        const device = await Device.update({ name, price }, { where: { id } });
  
        return resp.json(device);
      } catch (error) {
        console.log(error);
        next(ApiError.badRequest(error.message));
      }
}

exports.getAll = async function (req, resp) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    devices = await Device.findAll();
    console.log(devices)
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
     
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
      console.log(devices)
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
      console.log(devices)
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
      console.log(devices)
    }
    console.log(devices)
    return resp.json(devices);
}

exports.getDevice = async function (req, resp) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });

    return resp.json(device);
}

exports.removeDevice = async function (req, resp) {
    const { id } = req.params;
    const device = await Device.destroy({
      where: { id },
    });

    return resp.json(device);
}

exports.searchDevice = async function (req, resp) {
    const { name } = req.params;

    const device = await Device.findAndCountAll({
      where: { name },
      include: [{ model: DeviceInfo, as: "info" }],
    });

    return resp.json(device);
}