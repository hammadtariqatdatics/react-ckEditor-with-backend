import React, { Suspense } from "react";
import { useQuery } from "react-query";
import MuiTypography from "../MuiTypography";
import http from "../../utils/Api";
import { Box, Container, Typography } from "@mui/material";
import HeroBanner from "../hero/HeroBanner";
import CommentForm from "./CommentForm";
import { calculateReadingTime } from "../../utils";
import { Link } from "react-router-dom";
import SummeryModal from "./SummeryModal";

const ViewCkEditorData = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const readingTime = calculateReadingTime(data?.content);

  return (
    <>
      <HeroBanner
        headingText="CKEditor Data"
        paraText="Here, you can view your published post"
      />
      <Suspense fallback={<Box>Loading...</Box>}>
        <Box sx={{ margin: "100px 0px" }}>
          <Container
            sx={{
              border: "1px solid #28282a",
              paddingTop: "24px",
              paddingBottom: "24px",
              borderRadius: "10px",
            }}
          >
            {data !== undefined ? (
              <>
                <MuiTypography
                  variant="h5"
                  text={`Post Title = ${data?.title}`}
                  sx={{ marginBottom: "20px" }}
                />
                <MuiTypography
                  variant="body1"
                  text={`Estimated reading time: ${readingTime} seconds`}
                />
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: data?.content }}
                />
                <MuiTypography
                  variant="h6"
                  sx={{ marginTop: "20px", textTransform: "capitalize" }}
                >
                  Do you want to see Summery of above article?&nbsp;
                  <Link
                    to="#"
                    style={{ color: "#ff3366" }}
                    onClick={handleOpen}
                  >
                    Click Here.
                  </Link>
                  <SummeryModal
                    open={open}
                    handleClose={handleClose}
                    contentSummery={data?.contentSummery}
                  />
                </MuiTypography>
                <Box sx={{ marginTop: "50px" }}>
                  <CommentForm />
                </Box>
              </>
            ) : (
              <MuiTypography
                variant="h5"
                text="Sorry, there is no post published yet!"
                sx={{ textAlign: "center" }}
              />
            )}
          </Container>
        </Box>
      </Suspense>
    </>
  );
};

export default ViewCkEditorData;
