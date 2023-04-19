import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/payment/PaymentForm";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const Membership = () => {
  return (
    <>
      <HeroBanner
        headingText="Membership"
        paraText="Here you can pay $10.99 to purchase membership"
      />
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </>
  );
};

export default Membership;
