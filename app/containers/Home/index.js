/**
 *
 * ReportListing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { generateSO, getReportListing, selectReport } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectReportListing } from './selectors';
import TabView from './TabView';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
    height: 'calc(100vh)'
  },
  grid: {
    marginTop: 10
  },
  paper: {
    width: '75%',
    textAlign: 'center'
  },
  textField: {
    width: '90%'
  }
}));

export function ReportListing({
  onGenerateSO,
  onGetReportListing,
  onSelectReport,
  reportListing
}) {
  const classes = useStyles();
  useInjectReducer({ key: 'reportListing', reducer });
  useInjectSaga({ key: 'reportListing', saga });

  const [values, setValues] = React.useState({
    apiKey: localStorage.apiKey || '',
    company: localStorage.company || '',
    password: '',
    server: localStorage.server || 'https://ausmtsapp01.epicorsaas.com/SaaS201',
    username: localStorage.username || ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className={classes.container} data-tid="container">
      <Grid container direction="row" alignItems="center" justify="center">
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            className={classes.grid}
          >
            <Grid item xs={3}>
              <TextField
                name="company"
                label="Company ID"
                className={classes.textField}
                value={values.company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="apiKey"
                label="API Key"
                className={classes.textField}
                value={values.apiKey}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="server"
                label="Server"
                className={classes.textField}
                value={values.server}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            className={classes.grid}
          >
            <Grid item xs={3}>
              <TextField
                name="username"
                label="User Name"
                className={classes.textField}
                value={values.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="password"
                label="Password"
                type="password"
                className={classes.textField}
                value={values.password}
                onChange={handleInputChange}
              />
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
              <TabView
                credentials={values}
                onGenerateSO={onGenerateSO}
                onGetReportListing={onGetReportListing}
                onSelectReport={onSelectReport}
                reportListing={reportListing}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

ReportListing.propTypes = {
  onGenerateSO: PropTypes.func.isRequired,
  onGetReportListing: PropTypes.func.isRequired,
  onSelectReport: PropTypes.func,
  reportListing: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  reportListing: makeSelectReportListing()
});

function mapDispatchToProps(dispatch) {
  return {
    onGenerateSO: (credentials, salesOrderNumber) => {
      dispatch(generateSO(credentials, salesOrderNumber));
    },
    onGetReportListing: (credentials, whereClause) => {
      dispatch(getReportListing(credentials, whereClause));
    },
    onSelectReport: (credentials, sysRowId) => {
      dispatch(selectReport(credentials, sysRowId));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ReportListing);
