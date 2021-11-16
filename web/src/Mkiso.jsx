import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ComputerIcon from "@mui/icons-material/Computer";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import Qs from "qs";

function Mkiso() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

  axios
      .post(
        "http://127.0.0.1:8000/",
        Qs.stringify({
          git_url: data.get("git_url"),
          branch_name: data.get("branch_name"),
          arch: data.get("arch"),
        }))
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  };
  return (
    <Container component="main" fixed>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "primary.main", width: 120, height: 120 }}>
          <ComputerIcon sx={{ fontSize: 90 }} />
        </Avatar>

        <Typography variant="h2" component="h3">
          Mkiso
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="git_url"
                required
                fullWidth
                id="git_url"
                label="Git url"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="branch_name"
                required
                fullWidth
                id="branch_name"
                label="Branch name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="arch"
                label="Arch"
                id="arch"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
          >
            Build
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>status:</Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Mkiso;
