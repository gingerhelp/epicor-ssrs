import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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

export default function SalesOrderAcknowledgment(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    salesOrderNumber: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className={classes.root}>
      <TabPanel value={props.value} index={1}>
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
                  name="salesOrderNumber"
                  label="SO #"
                  className={classes.textField}
                  value={values.salesOrderNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={() =>
                    props.onGenerateSO(
                      props.credentials,
                      values.salesOrderNumber
                    )
                  }
                >
                  Load SO
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </TabPanel>
    </div>
  );
}

SalesOrderAcknowledgment.propTypes = {
  credentials: PropTypes.object,
  onGenerateSO: PropTypes.func,
  value: PropTypes.number
};
