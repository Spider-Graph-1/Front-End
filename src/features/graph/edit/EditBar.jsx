import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Tabs,
  Tab,
  Drawer,
  Typography,
  makeStyles,
} from '@material-ui/core';
import EditData from './EditData';
import EditStructure from './EditStructure';

const drawerWidth = 480;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  drawer: {
    display: 'flex',
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  toolbar: theme.mixins.toolbar,
}));

const TabPanel = ({ children, value, index }) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </Typography>
);

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const EditBar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <div className={classes.toolbar} />

      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="Graph Editing Panels"
        >
          <Tab label="Structure" {...a11yProps(0)} />
          <Tab label="Data" {...a11yProps(1)} />
          <Tab label="Styling" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EditStructure />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditData />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Drawer>
  );
};

export default EditBar;
