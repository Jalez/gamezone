import { Box, Fade, Popper, Typography } from "@mui/material";
import { useState } from "react";

type PoppingTitleProps = {
  topTitle?: string;
  bottomTitle?: string;
  children: React.ReactNode;
  topLocation?: string;
};

const PoppingTitle = ({
  children,
  topTitle,
  topLocation = "top",
  bottomTitle,
}: PoppingTitleProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleHover = (event: any) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const borderStyle = open ? "none" : "none";

  return (
    <Box sx={{}}>
      {topTitle && (
        <Popper
          sx={{ zIndex: 1200 }}
          open={open}
          anchorEl={anchorEl}
          placement={topLocation as any}
          transition
          disablePortal={true}
          keepMounted={true}
          modifiers={[
            {
              name: "flip",
              enabled: false, // This disables the automatic flipping behavior
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Typography
                // color="white"
                sx={{
                  textAlign: "center",
                  //give it white box shadow
                  padding: "0.5rem",
                  backgroundColor: "white",
                  // padding: "0",
                  borderRadius: "10px",
                  // border: borderStyle,
                }}
              >
                {topTitle}
              </Typography>
            </Fade>
          )}
        </Popper>
      )}
      <Box onMouseEnter={handleHover} onMouseLeave={handleClose}>
        {children}
      </Box>
      {bottomTitle && (
        <Popper
          sx={{
            zIndex: 1200,
            backgroundColor: "secondary.main",
            borderRadius: "10px",
            margin: "0",
            border: borderStyle,
          }}
          open={open}
          anchorEl={anchorEl}
          placement={"bottom"}
          keepMounted={true}
          disablePortal={true}
          transition
          modifiers={[
            {
              name: "flip",
              enabled: false, // This disables the automatic flipping behavior
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Typography
                sx={{
                  p: 0,
                  zIndex: 1500,
                }}
                color="primary"
              >
                {bottomTitle}
              </Typography>
            </Fade>
          )}
        </Popper>
      )}
    </Box>
  );
};

export default PoppingTitle;
