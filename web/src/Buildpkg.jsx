import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BuildIcon from "@mui/icons-material/Build";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Qs from "qs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Appbar from "./Appbar";

function Buildpkg() {
  

  // const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    status_message: "",
    alert_status: "error",
  });

  const [checked, setChecked] = React.useState(true);

  const switchChange = (event) => {
    setChecked(event.target.checked);
  };

  const { vertical, horizontal, open, status_message, alert_status } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let arch = "";
    if (event.target.x86_64.checked) {
      arch += " x86_64";
    }
    if (event.target.aarch64.checked) {
      arch += " aarch64";
    }
    if (event.target.mips64.checked) {
      arch += " mips64";
    }
    if (event.target.sw_64.checked) {
      arch += " sw_64";
    }
    if (arch == "") {
      console.log("空");
      setState({
        ...state,
        open: true,
        status_message: "请至少选择一个架构",
        alert_status: "error",
      });
      return;
    }

    console.log(
      Qs.stringify({
        git_url: data.get("git_url"),
        branch_name: data.get("branch_name"),
        arch: arch,
      })
    );

    console.log(event.target.repo.value);
    if (event.target.debug_mode.checked){
      console.log("测试模式");
      return
    }
    // 发送请求
    axios
      .post(
        "http://10.2.18.188:8000/buildpkg",
        Qs.stringify({
          git_url: data.get("git_url"),
          branch_name: data.get("branch_name"),
          arch: arch,
        })
      )
      .then(function (response) {
        console.log(response.data.status);
        if (response.data.status == "Error") {
          setState({
            ...state,
            open: true,
            status_message: "任务发送失败",
            alert_status: "error",
          });
        }
        if (response.data.status == "Ok") {
          setState({
            ...state,
            open: true,
            status_message: "任务发送成功",
            alert_status: "success",
          });
          event.target.git_url.value = "";
          event.target.branch_name.value = "";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("发送请求结束");
  };
  const handleClose = (reason) => {
    console.log(reason);
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const repos = [
    {
      value: "add_new",
      label: "新建",
    },
  ];
  const [repo, setRepo] = React.useState("add_new");
  const handleChange = (event) => {
    setRepo(event.target.value);
    console.log(event.target.value);
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
          <BuildIcon sx={{ fontSize: 90 }} />
        </Avatar>

        <Typography variant="h2" component="h3">
          Build Package
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                name="git_url"
                required
                fullWidth
                id="git_url"
                label="Git地址"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="branch_name"
                required
                fullWidth
                id="branch_name"
                label="分支名"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="repo"
                select
                fullWidth
                label="repo"
                value={repo}
                onChange={handleChange}
                helperText="请选择仓库"
              >
                {repos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={3}>
              <FormControlLabel
                control={<Checkbox defaultChecked name="x86_64" />}
                label="x86_64"
              />
            </Grid>
            <Grid item md={3}>
              <FormControlLabel
                control={<Checkbox defaultChecked name="aarch64" />}
                label="aarch64"
              />
            </Grid>
            <Grid item md={3}>
              <FormControlLabel
                control={<Checkbox defaultChecked name="mips64" />}
                label="mips64"
              />
            </Grid>
            <Grid item md={3}>
              <FormControlLabel
                control={<Checkbox defaultChecked name="sw_64" />}
                label="sw_64"
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

          
          
          <Appbar name="debug_mode" checked={checked} onChange={switchChange} />

          
        </Box>
      </Box>
    </Container>
  );
}

export default Buildpkg;
