import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import MuiTypography from "../MuiTypography";

const SummeryModal = ({ open, handleClose, contentSummery }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <MuiTypography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            text=" Summerize Content"
          />
          <MuiTypography
            id="transition-modal-description"
            sx={{ mt: 2 }}
            text={contentSummery}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default SummeryModal;
