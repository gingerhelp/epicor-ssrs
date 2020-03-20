import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  paper: {
    width: '100%',
    textAlign: 'center'
  },
  textField: {
    width: '90%'
  }
}));

function formatDate(strDate) {
  const date = new Date(strDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()}  ${strTime}`;
}

export default function SystemMonitorTab(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    whereClause: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className={classes.root}>
      <TabPanel value={props.value} index={0}>
        <Grid container direction="row" alignItems="center" justify="center">
          <Paper className={classes.paper}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.grid}
            >
              <Grid item xs={8}>
                <TextField
                  name="whereClause"
                  label="Where Clause"
                  className={classes.textField}
                  value={values.whereClause}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={() =>
                    props.onGetReportListing(
                      props.credentials,
                      values.whereClause
                    )
                  }
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.grid}
            >
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Submitted</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.reportListing.map(row => (
                        <TableRow
                          key={row.SysRowID}
                          onClick={() =>
                            props.onSelectReport(
                              props.credentials,
                              row.SysRowID
                            )
                          }
                        >
                          <TableCell component="th" scope="row">
                            {row.UserID}
                          </TableCell>
                          <TableCell>{row.RptDescription}</TableCell>
                          <TableCell>{formatDate(row.CreatedOn)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </TabPanel>
    </div>
  );
}

SystemMonitorTab.propTypes = {
  credentials: PropTypes.object,
  onGetReportListing: PropTypes.func,
  onSelectReport: PropTypes.func,
  reportListing: PropTypes.array,
  value: PropTypes.number
};
