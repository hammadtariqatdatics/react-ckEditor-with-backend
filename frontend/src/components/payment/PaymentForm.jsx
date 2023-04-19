import { Box, Container } from "@mui/material";
import React from "react";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const cardElementOptions = {
    style: {
      base: {
        backgroundColor: "#fff",
        borderRadius: "4px",
        padding: "12px",
        border: "1px solid #ddd",
        fontSize: "16px",
        color: "#495057",
      },
      invalid: {
        borderColor: "#dc3545",
      },
      "::placeholder": {
        color: "#6c757d",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // console.log(paymentMethod);

    if (!error) {
      const { id } = paymentMethod;
      localStorage.setItem("paymentId", JSON.stringify(id));

      try {
        const response = await http.post("/payments/create-payment", {
          id,
          amount: 1099,
        });
        console.log(response);
        toast("Membership purchased successfully...");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <form onSubmit={handleSubmit}>
          <CardElement options={cardElementOptions} />
          <MuiButton
            type="submit"
            disabled={!stripe}
            variant="contained"
            color="secondary"
            sx={{ marginTop: "20px" }}
          >
            Pay
          </MuiButton>
          <ToastContainer />
        </form>
      </Container>
    </Box>
  );
};

export default PaymentForm;
