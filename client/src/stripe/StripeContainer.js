import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51JTSO2DwatLYYLhddaqJqaxh4uYR3pe698b3my4ODN7LbuddwxR6BtTLX1lJRHKHHltSriA7RHSQPk6WKDHqRQ7x00aVKc5jNL";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
