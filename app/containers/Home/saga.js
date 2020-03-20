import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { GENERATE_SO, GET_REPORT_LISTING, SELECT_REPORT } from './constants';
import { updateReportListing } from './actions';
import {
  makeSelectCredentials,
  makeSelectReportListingWhereClause,
  makeSelectSelectedSalesOrderNumber,
  makeSelectSelectedSysRowId
} from './selectors';

export function* updateLocalStorage() {
  const { apiKey, company, server, username } = yield select(
    makeSelectCredentials()
  );

  localStorage.apiKey = apiKey;
  localStorage.company = company;
  localStorage.server = server;
  localStorage.username = username;
}

export function* generateSO() {
  const { apiKey, company, password, server, username } = yield select(
    makeSelectCredentials()
  );
  const salesOrderNumber = yield select(makeSelectSelectedSalesOrderNumber());
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
  try {
    const resp = yield call(
      request,
      `${server}/api/v2/odata/${company}/Erp.RPT.SalesOrderAckSvc/SubmitToAgent`,
      {
        method: 'POST',
        body: JSON.stringify({
          ds: {
            SalesOrderAckParam: [
              {
                OrderNum: salesOrderNumber,
                SysRowID: '00000000-0000-0000-0000-000000000000',
                AutoAction: 'SSRSPREVIEW',
                PrinterName: '',
                AgentSchedNum: '0',
                AgentID: 'System Task Agent',
                AgentTaskNum: 0,
                RecurringTask: false,
                ReportStyleNum: 1001,
                WorkstationID: 'ADAMELLISDDE7 1',
                DateFormat: 'm/d/yyyy',
                NumericFormat: ',.',
                ProcessTaskNum: '0',
                ReportCurrencyCode: 'USD',
                ReportCultureCode: 'en-US',
                SSRSRenderFormat: 'PDF',
                PrintReportParameters: 'false',
                SSRSEnableRouting: 'false',
                DesignMode: 'false',
                RowMod: 'A'
              }
            ]
          },
          agentID: 'System Task Agent',
          agentSchedNum: 0,
          agentTaskNum: 0,
          maintProgram: 'Erp.UIRpt.SalesOrderAck'
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic ${basicAuth}`,
          'x-api-key': apiKey
        }
      }
    );
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
}

export function* getReportListing() {
  const { apiKey, company, password, server, username } = yield select(
    makeSelectCredentials()
  );
  const whereClause = yield select(makeSelectReportListingWhereClause());
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
  try {
    const getList = yield call(
      request,
      `${server}/api/v2/odata/${company}/Ice.BO.ReportMonitorSvc/GetList`,
      {
        method: 'POST',
        body: JSON.stringify({
          whereClause,
          pageSize: 0,
          absolutePage: 0
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic ${basicAuth}`,
          'x-api-key': apiKey
        }
      }
    );
    yield put(updateReportListing(getList.returnObj.SysRptLstList));
  } catch (error) {
    console.log(error);
  }
}

export function* selectReport() {
  const { apiKey, company, password, server, username } = yield select(
    makeSelectCredentials()
  );
  const sysRowId = yield select(makeSelectSelectedSysRowId());
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
  try {
    const resp = yield call(
      request,
      `${server}/api/v2/odata/${company}/Ice.BO.ReportMonitorSvc/GetReportBytes`,
      {
        method: 'POST',
        body: JSON.stringify({
          sysRowId
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic ${basicAuth}`,
          'x-api-key': apiKey
        }
      }
    );
    const pdfWindow = window.open('');
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${
        resp.returnObj
      }'></iframe>`
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* reportListingSaga() {
  yield all([
    takeEvery([GENERATE_SO, GET_REPORT_LISTING], updateLocalStorage),
    takeEvery(GENERATE_SO, generateSO),
    takeEvery(GET_REPORT_LISTING, getReportListing),
    takeEvery(SELECT_REPORT, selectReport)
  ]);
}
