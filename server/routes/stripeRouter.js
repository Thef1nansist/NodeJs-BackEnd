const Router = require("express");
const router = new Router();
const StripeController = require("../controlles/StripeController");

router.post("/", StripeController.charge);

module.exports = router;
