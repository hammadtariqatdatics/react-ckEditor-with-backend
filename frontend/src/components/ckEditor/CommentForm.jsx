import { Box, Grid } from "@mui/material";
import React from "react";
import { Form, Formik } from "formik";
import { commentSchema } from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";

const CommentForm = () => {
  const postData = (payload) => {
    const articleId = JSON.parse(localStorage.getItem("articleId"));
    const response = http.post(`/comments/create/${articleId}`, payload);
    return response;
  };
  const { isLoading, mutate } = useMutation(postData, {
    onSuccess: (successData) => {
      toast("Comment created succesfully...");
      console.log(successData);
    },
    onError: (Error) => {
      toast("Comment is not created...");
      console.log(Error);
    },
  });

  const handleSubmit = (payload) => {
    mutate(payload);
  };

  const initialValues = {
    comment: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={commentSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        handleSubmit(values);
        resetForm({});
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container columnGap={2}>
            <Grid xl={8} lg={8} md={8} sm={12} xs={12}>
              <CustomTextFields
                variant="outlined"
                label="Comment"
                color="secondary"
                type="text"
                placeholder="Your Comment"
                name="comment"
                value={values.comment}
                onChange={handleChange}
                fullWidth="true"
                onBlur={handleBlur}
                sx={{ marginBottom: "20px" }}
              />
            </Grid>
            <Grid xl={3} lg={3} md={3} sm={12} xs={12}>
              <MuiButton
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                Add Comment
              </MuiButton>
              <ToastContainer />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
