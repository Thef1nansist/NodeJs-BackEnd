require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ApiError = require("../error/ApiError");
const { Basket } = require("../models/models");

exports.charge = async function (req, resp, next) {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id, userId } = req.body;
    
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "USD",
        description: "9Element",
        receipt_email: "vladsavchenko994@gmail.com",
        payment_method: id,
        confirm: true,
      });
      await Basket.destroy({
        where: { userId },
      });

      return resp.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 17 | error", error);

      return resp.json({
        message: "Payment Failed",
        success: false,
      });
    }
}