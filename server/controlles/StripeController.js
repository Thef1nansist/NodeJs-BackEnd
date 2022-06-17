const StripeServices = require("../Services/stripeService");

class StripeController {
  async charge(req, resp, next) {
    return await StripeServices.charge(req, resp, next);
  }
}

module.exports = new StripeController();
