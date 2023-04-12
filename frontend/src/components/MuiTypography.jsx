import React from "react";
import { Typography } from "@mui/material";

const MuiTypography = ({
  children,
  variant,
  component,
  align,
  sx,
  text,
  dangerouslySetInnerHTML,
}) => {
  return (
    <Typography
      variant={variant}
      component={component}
      align={align}
      sx={sx}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {text}
      {children}
    </Typography>
  );
};

export default MuiTypography;
