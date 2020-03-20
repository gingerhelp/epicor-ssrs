import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reportListing state domain
 */

const selectReportListingDomain = state => state.reportListing || initialState;

const makeSelectCredentials = () =>
  createSelector(
    selectReportListingDomain,
    substate => substate.credentials
  );

const makeSelectReportListing = () =>
  createSelector(
    selectReportListingDomain,
    substate => substate.reportListing
  );

const makeSelectReportListingWhereClause = () =>
  createSelector(
    selectReportListingDomain,
    substate => substate.reportListingWhereClause
  );

const makeSelectSelectedSalesOrderNumber = () =>
  createSelector(
    selectReportListingDomain,
    substate => substate.salesOrderNumber
  );

const makeSelectSelectedSysRowId = () =>
  createSelector(
    selectReportListingDomain,
    substate => substate.selectedSysRowId
  );

export {
  makeSelectCredentials,
  makeSelectReportListing,
  makeSelectReportListingWhereClause,
  makeSelectSelectedSalesOrderNumber,
  makeSelectSelectedSysRowId
};
