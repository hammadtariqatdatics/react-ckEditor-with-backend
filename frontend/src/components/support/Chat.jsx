import { Box, Container, Avatar, Grid } from "@mui/material";
import chatGPT from "../../assets/img/ChatGPT-Logo.png";
import MuiTypography from "../MuiTypography";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { chatSchema } from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import { useMutation } from "react-query";

const Chat = () => {
  const [promptedResponse, setPromptedResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const emailId = JSON.parse(localStorage.getItem("emailId"));
    if (emailId) {
      setCustomerEmail(emailId);
    }
  }, []);

  const postData = async (payload) => {
    try {
      const response = await http.post("/supports/chat", {
        prompt: payload.prompt,
        email: customerEmail,
      });
      // console.log(response);
      setPromptedResponse(response.data.response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const { isLoading, mutate } = useMutation(postData, {
    onSuccess: (successData) => {
      console.log(successData);
    },
    onError: (Error) => {
      console.log(Error);
    },
  });

  const handleSubmit = (payload) => {
    setLoading(true);
    mutate(payload);
  };

  const initialValues = {
    prompt: "",
  };

  return (
    <Box sx={{ margin: "100px 0px 50px 0px" }}>
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={chatSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            handleSubmit(values);
            resetForm({});
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <Grid container>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Avatar
                    alt="chat-gpt-logo"
                    src={chatGPT}
                    sx={{ margin: "0px auto 20px auto" }}
                  />
                </Grid>
                <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
                  <CustomTextFields
                    variant="outlined"
                    label="Question?"
                    color="secondary"
                    type="text"
                    placeholder="Ask me anything :)"
                    name="prompt"
                    value={values.prompt}
                    onChange={handleChange}
                    fullWidth="true"
                    onBlur={handleBlur}
                    sx={{ marginBottom: "20px" }}
                  />
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                  <MuiButton
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="medium"
                    disabled={isLoading}
                  >
                    Send
                  </MuiButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        <Box sx={{ margin: "50px 0px 100px 0px" }}>
          {loading ? (
            "Loading...."
          ) : (
            <MuiTypography variant="body1">
              {promptedResponse}
            </MuiTypography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Chat;
