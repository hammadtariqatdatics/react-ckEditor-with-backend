import { Box, Container } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import articleSchema from "../../schemas/Validation";
import MuiButton from "../MuiButton";
import http from "../../utils/Api";
import CustomTextFields from "../CustomTextFields";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import MyEditor from "./Editor";

const CkEditorForm = () => {
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    const emailId = JSON.parse(localStorage.getItem("emailId"));
    if (emailId) {
      setIsExist(true);
    }
  }, []);

  const postData = (payload) => http.post("/articles/publish", payload);
  const { isLoading, mutate } = useMutation(postData, {
    onSuccess: (successData) => {
      toast("Article published succesfully...");
      localStorage.setItem("articleId", JSON.stringify(successData.data.id));
      console.log(successData);
    },
    onError: (Error) => {
      toast("Article is not published...");
      console.log(Error);
    },
  });

  const handleSubmit = (payload) => {
    mutate(payload);
  };

  const initialValues = {
    title: "",
    content: "",
  };

  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <Suspense fallback={<Box>Loading...</Box>}>
          <Formik
            initialValues={initialValues}
            validationSchema={articleSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              handleSubmit(values);
              //   resetForm({});
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <CustomTextFields
                  variant="outlined"
                  label="Title"
                  color="secondary"
                  type="text"
                  placeholder="Your Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  fullWidth="true"
                  onBlur={handleBlur}
                  sx={{ marginBottom: "20px" }}
                />
                <Field name="content" component={MyEditor} />
                <Box marginTop={6}>
                  {isExist && (
                    <MuiButton
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="large"
                      disabled={isLoading}
                    >
                      Publish
                    </MuiButton>
                  )}
                  <ToastContainer />
                </Box>
              </Form>
            )}
          </Formik>
        </Suspense>
      </Container>
    </Box>
  );
};

export default CkEditorForm;
