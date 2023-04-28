import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Facebook, Twitter } from "@mui/icons-material";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";

const Footer = () => {
  return (
    <Box sx={{ background: "#fff5f8" }}>
      <Box
        sx={{
          padding: "64px 0px 64px 0px",
        }}
      >
        <Container>
          <Grid container rowGap={5}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: {
                    xl: "flex-start",
                    lg: "flex-start",
                    md: "flex-start",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                <Box
                  sx={{
                    height: "48px",
                    width: "48px",
                    background: "#ffc071",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  marginRight={2}
                >
                  <Link href="https://www.facebook.com/">
                    <Facebook fontSize="large" />
                  </Link>
                </Box>
                <Box
                  sx={{
                    height: "48px",
                    width: "48px",
                    background: "#ffc071",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link href="https://www.twitter.com/">
                    <Twitter fontSize="large" />
                  </Link>
                </Box>
              </Stack>
              <Typography
                marginTop={4}
                sx={{
                  textAlign: {
                    xl: "left",
                    lg: "left",
                    md: "left",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                © CKEditor Project 2023
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  textAlign: {
                    xl: "left",
                    lg: "left",
                    md: "left",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                QUICK LINKS
              </Typography>
              <Box>
                <Box
                  sx={{
                    width: "28px",
                    height: "3px",
                    display: "block",
                    margin: {
                      xl: "8px 0px",
                      lg: "8px 0px",
                      md: "8px 0px",
                      sm: "8px auto",
                      xs: "8px auto",
                    },
                    background: "#000",
                  }}
                />
              </Box>
              <MenuList
                sx={{
                  textAlign: {
                    xl: "left",
                    lg: "left",
                    md: "left",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                <Link href="/membership">
                  <ListItemText>Membership</ListItemText>
                </Link>
                <Link href="/support">
                  <ListItemText>Support</ListItemText>
                </Link>
              </MenuList>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
