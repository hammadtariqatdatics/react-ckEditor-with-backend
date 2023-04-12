import React, { useState } from "react";
import MuiAppBar from "../MuiAppBar";
import MuiToolbar from "../MuiToolbar";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MuiAppBar position="fixed">
      <MuiToolbar
        sx={{
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          padding: {
            xs: "5px 0px",
            sm: "5px 0px",
            md: "0px 24px",
            lg: "0px 24px",
            xl: "0px 24px",
          },
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "24px",
            textTransform: "uppercase",
          }}
        >
          CKEditor Project
        </Link>
        <Box
          sx={{
            flex: 1,
            display: {
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "none",
              xs: "none",
            },
            justifyContent: "flex-end",
          }}
        >
          <Link
            to="/open-editor"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "18px",
              textTransform: "uppercase",
              marginLeft: "20px",
            }}
          >
            Open Editor
          </Link>
          <Link
            to="/view-editor-data"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "18px",
              textTransform: "uppercase",
              marginLeft: "20px",
            }}
          >
            View Data
          </Link>
        </Box>
        <Box
          sx={{
            display: {
              xl: "none",
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
            },
          }}
        >
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon color="secondary" fontSize="medium" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link
              to="/view-editor"
              style={{
                color: "#000",
                textDecoration: "none",
                fontSize: "24px",
                textTransform: "uppercase",
              }}
            >
              <MenuItem>View Editor</MenuItem>
            </Link>
          </Menu>
        </Box>
      </MuiToolbar>
    </MuiAppBar>
  );
};

export default AppBar;
