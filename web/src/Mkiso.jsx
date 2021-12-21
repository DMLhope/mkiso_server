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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Appbar from "./Appbar";

function Mkiso() {

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    status_message: "",
    alert_status:"error"
  });

  const { vertical, horizontal, open, status_message,alert_status } = state;

  const [checked, setChecked] = React.useState(true);

  const switchChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    

    if (event.target.debug_mode.checked){
      console.log("测试模式");
      return
    }
    
    axios.post(
        "http://10.2.18.188:8000/mkiso",
        Qs.stringify({
          git_url: data.get("git_url"),
          branch_name: data.get("branch_name"),
          arch: data.get("arch"),
        }))
        .then(function (response) {
          console.log(response.data.status);
          if (response.data.status == 'Error'){
            setState({ ...state,open: true ,status_message:"任务发送失败",alert_status:"error" });
          }
          if (response.data.status == 'Ok'){
            setState({ ...state,open: true ,status_message:"任务发送成功",alert_status:"success" });
            event.target.git_url.value="";
            event.target.branch_name.value="";
            event.target.arch.value="";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
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

          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={alert_status}
              sx={{ width: "100%" }}
            >
              {status_message}
            </Alert>
          </Snackbar>

          <Grid container justifyContent="flex-start">
            <Grid item>status:</Grid>
          </Grid>

          <Appbar name="debug_mode" checked={checked} onChange={switchChange} />

        </Box>
      </Box>
    </Container>
  );
}

export default Mkiso;
