import React, { Suspense } from "react";
import { useQuery } from "react-query";
import MuiTypography from "../MuiTypography";
import http from "../../utils/Api";
import { Box, Container } from "@mui/material";
import HeroBanner from "../hero/HeroBanner";
import CommentForm from "./CommentForm";
import { calculateReadingTime, linksStyle } from "../../utils";
import { Link } from "react-router-dom";
import SummeryModal from "./SummeryModal";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";

const ViewCkEditorData = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const articleId = JSON.parse(localStorage.getItem("articleId"));

  const getArticleData = () => {
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

  const translateContent = async (value) => {
    try {
      const translateData = await http.put(`/articles/${articleId}`, {
        translateVal: value,
      });
      toast("Article translated succesfully...");
      console.log(translateData);
    } catch (error) {
      console.log(error.message);
    }
  };

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
                <MuiTypography variant="body1">
                  {parse(data?.content)}
                </MuiTypography>
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
                <MuiTypography
                  variant="h6"
                  sx={{ marginTop: "20px", textTransform: "capitalize" }}
                >
                  Do you want to translate above article into &nbsp;
                  <Link
                    to="#"
                    style={linksStyle}
                    onClick={() => translateContent("french")}
                  >
                    French? &nbsp;
                  </Link>
                  <Link
                    to="#"
                    style={linksStyle}
                    onClick={() => translateContent("german")}
                  >
                    German? &nbsp;
                  </Link>
                  <Link
                    to="#"
                    style={linksStyle}
                    onClick={() => translateContent("spanish")}
                  >
                    Spanish? &nbsp;
                  </Link>
                  <Link
                    to="#"
                    style={linksStyle}
                    onClick={() => translateContent("english")}
                  >
                    English?
                  </Link>
                </MuiTypography>
                <ToastContainer />
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
