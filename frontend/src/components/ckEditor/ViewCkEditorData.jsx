import React, { Suspense } from "react";
import { useQuery } from "react-query";
import MuiTypography from "../MuiTypography";
import http from "../../utils/Api";
import { Box, Container, Typography } from "@mui/material";
import HeroBanner from "../hero/HeroBanner";

const ViewCkEditorData = () => {
  const getArticleData = () => {
    const articleId = JSON.parse(localStorage.getItem("articleId"));
    const response = http.get(`/articles/${articleId}`);
    return response;
  };
  const { data } = useQuery("articles", getArticleData, {
    onSuccess: (successData) => {
      console.log("Get Article successfully...", successData);
    },
    onError: (Error) => {
      console.log("Not getting article...", Error);
    },
  });
  return (
    <>
      <HeroBanner headingText="CKEditor Data" />
      <Suspense fallback={<div>Loading...</div>}>
        <Box sx={{ margin: "100px 0px" }}>
          <Container>
            <MuiTypography
              variant="h5"
              text={`Title = ${data?.title}`}
            ></MuiTypography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />
          </Container>
        </Box>
      </Suspense>
    </>
  );
};

export default ViewCkEditorData;
