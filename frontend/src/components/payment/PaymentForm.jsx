import { Box, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    name: "",
    email: "",
    phone: "",
  });
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
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log(paymentMethod);

    if (!error) {
      const { id } = paymentMethod;

      try {
        const response = await http.post("/payments/create-payment", {
          id: id,
          amount: 1099,
          name: paymentData.name,
          email: paymentData.email,
          phone: paymentData.phone,
        });
        console.log(response);
        toast("Membership purchased successfully...");
        localStorage.setItem("emailId", JSON.stringify(paymentData.email));
      } catch (error) {
        toast(
          "Sorry, this user has already purchased the membership... Try new one."
        );
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentData((paymentData) => {
      return {
        ...paymentData,
        [name]: value,
      };
    });
  };

  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            color="secondary"
            type="text"
            placeholder="Full name"
            name="name"
            value={paymentData.name}
            onChange={handleChange}
            fullWidth="true"
            sx={{ marginBottom: "40px" }}
            required="true"
          />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            color="secondary"
            type="email"
            placeholder="Email address"
            name="email"
            value={paymentData.email}
            onChange={handleChange}
            fullWidth="true"
            sx={{ marginBottom: "40px" }}
            required="true"
          />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            color="secondary"
            type="text"
            placeholder="Phone number"
            name="phone"
            value={paymentData.phone}
            onChange={handleChange}
            fullWidth="true"
            required="true"
            sx={{ marginBottom: "40px" }}
          />
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
