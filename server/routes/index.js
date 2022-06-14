const Router = require("express");
const router = new Router();

const deviceRouter = require("./deviceRouter");
const userRouter = require("./userRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const basketRouter = require("./basketRouter");
const stripeRouter = require("./stripeRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/device", deviceRouter);
router.use("/brand", brandRouter);
router.use("/basket", basketRouter);
router.use("/stripe", stripeRouter);

module.exports = router;
