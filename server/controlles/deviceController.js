const DeviceServices = require("../Services/deviceService");

class DeviceController {
  async create(req, resp, next) {
    return await DeviceServices.create(req, resp, next);
  }

  async update(req, resp, next) {
    return await DeviceServices.update(req, resp, next);
  }

  async getAll(req, resp) {
   return await DeviceServices.getAll(req, resp);
  }

  async getOne(req, resp) {
    return await DeviceServices.getDevice(req, resp);
  }

  async removeItem(req, resp) {
    return await DeviceServices.removeDevice(req, resp);
  }

  async searchItem(req, resp) {
    return await DeviceServices.searchDevice(req, resp);
  }
}

module.exports = new DeviceController();
