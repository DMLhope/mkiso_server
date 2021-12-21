import React from "react";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";
// import './App.css'
// import Mkiso from "./Mkiso";
import Tabbar from "./Tabbar";
// import Appbar from "./Appbar";

const debug_mode = React.createContext(true);

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));

function App() {
  return (
    // <Grid container spacing={2}>
    //   <Grid item xs={12}>
    //     <Item>
    //       <Tabbar />
    //     </Item>
    //   </Grid>
    // </Grid>
    <Item>
      <Tabbar />
    </Item>
  );
}

export default App;
