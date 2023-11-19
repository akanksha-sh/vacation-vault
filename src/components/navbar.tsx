import * as React from "react";
import {
  Button,
  Container,
  Toolbar,
  AppBar,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CalendarMonthOutlined, Face3Outlined } from "@mui/icons-material";
import theme from "../style/theme";

const Navbar: React.FC = () => {
  return (
    <AppBar
      sx={{ backgroundColor: theme.palette.primary.dark }}
      position="sticky"
    >
      <Container sx={{ height: "8vh" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "inherit",
            width: "auto",
          }}
        >
          {/* Spacer div to push the title to the center */}
          <Box sx={{ width: "15%", display: { xs: "none", md: "block" } }} />

          {/* App title */}
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Holiday Viewer
          </Typography>

          {/* Icon buttons */}
          <Box
            sx={{
              width: "15%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{
                color: "white",
              }}
            >
              <CalendarMonthOutlined />
            </Button>

            <Button
              component={Link}
              to="/login"
              sx={{
                color: "white",
              }}
            >
              <Face3Outlined />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
