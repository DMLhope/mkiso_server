import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



export default function Appbar(props) {
  return (
    <AppBar
            position="fixed"
            color="primary"
            sx={{ top: "auto", bottom: 0,zIndex: 'tooltip' }}
          >
            <Toolbar>
              <IconButton color="inherit" onClick={props.menu_onClick} aria-label="open drawer">
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit" onClick={props.up_onClick} aria-label="open drawer">
                <KeyboardArrowUpIcon />
              </IconButton>

              {/* <StyledFab color="secondary" aria-label="add">
                <AddIcon />
              </StyledFab> */}
              <Box sx={{ flexGrow: 1 }} />
              <FormControlLabel
                control={
                  <Switch
                    name="debug_mode"
                    checked={props.checked}
                    onChange={props.onChange}
                    inputProps={{ "aria-label": "controlled" }}
                    color="secondary"
                  />
                  
                }
                label="测试模式"
              />
            </Toolbar>
          </AppBar>
  );
}