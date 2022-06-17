const uuid = require("uuid");
const path = require("path");
const { Basket, BasketDevice, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

exports.create = async function(req, resp, next) {
    try {
        const { userId, deviceId } = req.body;
  
        if (userId != null && deviceId != null) {
          const basket = await Basket.create({ userId });
          const basketId = basket._previousDataValues.id;
          const basketDevice = await BasketDevice.create({ basketId, deviceId });
          return resp.json(basketDevice);
        }
  
        next(ApiError.internal("user or device = null"));
      } catch (error) {
        next(ApiError.badRequest(error.message));
      }
}

exports.getAllBasket = async function(req, resp) {
    const { userId } = req.params;
    if (userId != null) {
      const basketItem = await Basket.findAll({
        where: { userId },
      });
      let array = JSON.stringify(basketItem);
      let arrayObj = JSON.parse(array);
      let basketId = [];
      arrayObj.forEach((element) => {
        basketId.push(element.id);
      });

      const basketDeviceForUser = await BasketDevice.findAll({
        where: { basketId },
      });

      array = JSON.stringify(basketDeviceForUser);
      arrayObj = JSON.parse(array);

      let id = [];

      arrayObj.forEach((element) => {
        id.push(element.deviceId);
      });

      let devices = await Device.findAll({
        where: { id },
      });

      let arrayJson = JSON.stringify(devices);
      let deviceObj = JSON.parse(arrayJson);

      arrayObj.forEach((element) => {
        deviceObj.forEach((device) => {
          if (element.deviceId == device.id) {
            device["basketId"] = element.basketId;
          }
        });
      });

      return resp.json(deviceObj);
    }
}

exports.removeDevice = async function (req, resp) {
    const { basketId } = req.params;

    let element = await Basket.destroy({
      where: { id: basketId },
    });

    await BasketDevice.destroy({
      where: { basketId },
    });

    return resp.json(element);
}