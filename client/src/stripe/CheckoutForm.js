import React, { useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import { payStripe } from "../http/deviceAPI";
import { Context } from "..";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BASKET_ROUTE, SHOP_ROUTE } from "../utils/consts";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { device } = useContext(Context);
  const history = useNavigate();

  const handleSubmit = async (event) => {
    var btn = document.getElementById("btn_sub");
    btn.disabled = true;
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      let amount = device.getAmount;
      try {
        const { id } = paymentMethod;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("amount", amount);
        formData.append("userId", jwt_decode(localStorage.getItem("token")).id);
        device.setAmount(0);
        payStripe(formData).then((data) =>
          data.success ? history(SHOP_ROUTE) : history(BASKET_ROUTE)
        );
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div class="container">
      <div class="row justify-content-center align-items-center mt-5">
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
          <CardElement />
          <button id="btn_sub" class="btn btn-primary">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};
