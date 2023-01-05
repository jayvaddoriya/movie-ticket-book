import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, TextField } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { useNavigate } from "react-router-dom";
import Login from "../../pages/Login";

const NavBar = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOnLogin = () => {
    navigate("/login");
    setOpen(true)
  };
  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container>
            <Grid xxl={4} xl={4} sx={{ display: "flex", alignItems: "center" }}>
              <MovieCreationIcon
                sx={{ display: "flex", alignItems: "center" }}
              />
            </Grid>
            <Grid xxl={4} xl={4}>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder="Search Across Multiple Movies"
                variant="filled"
                fullWidth
                color="secondary"
                sx={{
                  input: {
                    color: "#fff",
                    padding: "10px",
                    borderBottom: "2px solid #fff",
                    fontWeight: "500",
                  },
                }}
              />
            </Grid>
            <Grid
              xxl={4}
              xl={4}
              sx={{
                display: "fllex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button color="inherit" onClick={handleOnLogin}>
                Auth
              </Button>
              <Button color="inherit">Admin</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Login open={open} setOpen={setOpen}/>
    </Box>
  );
};

export default NavBar;
