/*
 *
 * ReportListing reducer
 *
 */
import produce from 'immer';
import {
  GENERATE_SO,
  GET_REPORT_LISTING,
  SELECT_REPORT,
  UPDATE_REPORT_LISTING
} from './constants';

export const initialState = {
  credentials: {},
  reportListingWhereClause: '',
  reportListing: [],
  salesOrderNumber: 0,
  selectedSysRowId: ''
};

/* eslint-disable default-case, no-param-reassign */
const reportListingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GENERATE_SO:
        draft.credentials = action.credentials;
        draft.salesOrderNumber = action.salesOrderNumber;
        break;

      case GET_REPORT_LISTING:
        draft.credentials = action.credentials;
        draft.reportListingWhereClause = action.whereClause;
        break;
      case SELECT_REPORT:
        draft.selectedSysRowId = action.sysRowId;
        break;
      case UPDATE_REPORT_LISTING:
        draft.reportListing = action.reportListing;
        break;
    }
  });

export default reportListingReducer;
