import Mkiso from './Mkiso';
import Buildpkg from './Buildpkg';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Owntest from './Owntest';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Container >
    <Box sx={{ width: '100%' }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
      {/* <AppBar position="static"> */}
        <Tabs 
            value={value} 
            onChange={handleChange}
            variant="fullWidth"
            
            centered
            aria-label="tabs">
          <Tab label="Mkiso" {...a11yProps(0)} />
          <Tab label="Buildpkg" {...a11yProps(1)} disabled/>
          <Tab label="Owntest" {...a11yProps(2)}  disabled/>
        </Tabs>
        {/* </AppBar> */}
      {/* </Box> */}
      <TabPanel value={value} index={0}>        
        <Mkiso />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Buildpkg />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Owntest />
      </TabPanel>
    </Box>
    // </Container>
  );
}
