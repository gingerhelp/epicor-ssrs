/*
 *
 * ReportListing actions
 *
 */

import {
  GENERATE_SO,
  GET_REPORT_LISTING,
  SELECT_REPORT,
  UPDATE_REPORT_LISTING
} from './constants';

export function generateSO(credentials, salesOrderNumber) {
  return {
    type: GENERATE_SO,
    credentials,
    salesOrderNumber
  };
}

export function getReportListing(credentials, whereClause) {
  return {
    type: GET_REPORT_LISTING,
    credentials,
    whereClause
  };
}

export function selectReport(credentials, sysRowId) {
  return {
    type: SELECT_REPORT,
    credentials,
    sysRowId
  };
}

export function updateReportListing(reportListing) {
  return {
    type: UPDATE_REPORT_LISTING,
    reportListing
  };
}
