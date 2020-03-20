import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SalesOrderAcknowledgment from './SalesOrderAcknowledgment';
import SystemMonitorTab from './SystemMonitorTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function TabView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Load Report From System Monitor" {...a11yProps(0)} />
          <Tab label="Sales Order Acknowledgement" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SystemMonitorTab
        value={value}
        index={0}
        credentials={props.credentials}
        onGetReportListing={props.onGetReportListing}
        onSelectReport={props.onSelectReport}
        reportListing={props.reportListing}
      />
      <SalesOrderAcknowledgment
        value={value}
        index={1}
        credentials={props.credentials}
        onGenerateSO={props.onGenerateSO}
      />
    </div>
  );
}

TabView.propTypes = {
  credentials: PropTypes.object,
  onGetReportListing: PropTypes.func,
  onGenerateSO: PropTypes.func,
  onSelectReport: PropTypes.func,
  reportListing: PropTypes.array
};
