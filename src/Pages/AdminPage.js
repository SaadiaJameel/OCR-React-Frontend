import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Requests from '../Components/AdminPortal/Requests';
import Reviewers from '../Components/AdminPortal/Reviewers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3}}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AdminPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='body'>
    <Box sx={{ bgcolor: 'background.paper', display: 'flex'}}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider'}}
      >
        <Tab label="Requests" {...a11yProps(0)} />
        <Tab label="Reviewers" {...a11yProps(1)} />
      </Tabs>
      <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        <TabPanel value={value} index={0}>
          <Requests/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Reviewers/>
        </TabPanel>
      </div>
    </Box>
    </div>
  );
}

export default AdminPage;