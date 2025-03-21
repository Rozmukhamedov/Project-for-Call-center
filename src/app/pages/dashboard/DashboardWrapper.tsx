import moment from "moment";
import { useIntl } from "react-intl";
import { ESInput } from "../../components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../../_metronic/hook/apiClient";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ApiError, notifyError } from "../../../_metronic/helpers/notifyError";

type DataType = {
  id: number;
  full_name: string;
  team_id: number;
  avatar: string;
  phone: string;
  email: string;
  count_of_plan: number;
  done_percent: number;
  done: number;
  created_at: string;
  updated_at: string;
};

type ResultType = {
  plan: number;
  real: number;
  percent: number;
};

type InfoType = {
  totalCallAmount: number;
  totalIncomeCallAmount: number;
  totalOutcomeCallAmount: number;
  totalSalesAmount: number;
  totalSalesSumPricd: number;
  result: ResultType;
  kpi_type: string;
};

export interface QueryParams {
  date?: string;
}

const DashboardWrapper = () => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<DataType[]>([]);
  const [info, setInfo] = useState<InfoType | null>(null);

  // QUERY PARAMS
  const date = searchParams.get("date") || moment().format("DD-MM-YYYY");

  const buildQueryParams = () => {
    const query = `?date=${date}`;

    return query;
  };

  // GET DATA
  async function getData() {
    try {
      const resLeader = await apiClient.get(
        `/statistics/get-employee-leader${buildQueryParams()}`
      );
      setData(resLeader.data.data.employees || []);
      const resData = await apiClient.get(
        `/statistics/get-statistics${buildQueryParams()}`
      );
      setInfo(resData.data.data || null);
    } catch (error) {
      const apiError = error as ApiError;
      notifyError(intl, apiError.response.status);
    }
  }

  useEffect(() => {
    getData();
  }, [searchParams]);

  const changeQueryParams = (param: QueryParams) => {
    Object.entries(param).forEach(([name, value]) => {
      searchParams.set(name, `${value}`);
    });

    setSearchParams(searchParams);
  };

  return (
    <>
      <Content>
        <div className="d-flex align-items-center jutify-content-end mb-5 w-100">
          <ESInput
            type="date"
            placeholder={intl.formatMessage({ id: "COMMON.SEARCH" })}
            className="form-control form-control-solid w-200px ms-auto"
            onChange={(e) => changeQueryParams({ date: e.target.value })}
          />
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="card h-100ox mb-5 mb-xl-10">
              <div className="card-header py-5">
                <div className="card-title d-flex flex-column w-100">
                  <span className="text-black-500 pt-1 fw-semibold fs-2 mb-5">
                    {intl.formatMessage({
                      id: "COMMON.TOTAL_NUMBER_OF_SHARES",
                    })}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2 me-20">
                      {info?.totalCallAmount || 0}{" "}
                      {intl.formatMessage({ id: "COMMON.SHARES" })}
                    </span>

                    {/* <span className="badge badge-light-success fs-1">
                      <KTIcon
                        iconName="arrow-up"
                        className="fs-5 text-success ms-n1"
                      />
                      2.2%
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100ox mb-5 mb-xl-10">
              <div className="card-header py-5">
                <div className="card-title d-flex flex-column w-100">
                  <span className="text-black-500 pt-1 fw-semibold fs-2 mb-5">
                    {intl.formatMessage({
                      id: "COMMON.TOTAL_NUMBER_OF_LEADS",
                    })}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2 me-20">
                      {info?.totalSalesAmount || 0}{" "}
                      {intl.formatMessage({ id: "COMMON.SHARES" })}
                    </span>

                    {/* <span className="badge badge-light-danger fs-1">
                      <KTIcon
                        iconName="arrow-down"
                        className="fs-5 text-danger ms-n1"
                      />
                      2.2%
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100ox mb-5 mb-xl-10">
              <div className="card-header py-5">
                <div className="card-title d-flex flex-column w-100">
                  <span className="text-black-500 pt-1 fw-semibold fs-2 mb-5">
                    {intl.formatMessage({
                      id: "COMMON.TOTAL_OUTCOME_CALL_AMOUNT",
                    })}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2 me-20">
                      {info?.totalIncomeCallAmount || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100ox mb-5 mb-xl-10">
              <div className="card-header py-5">
                <div className="card-title d-flex flex-column w-100">
                  <span className="text-black-500 pt-1 fw-semibold fs-2 mb-5">
                    {intl.formatMessage({
                      id: "COMMON.TOTAL_INCOME_CALL_AMOUNT",
                    })}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2 me-20">
                      {info?.totalIncomeCallAmount || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-6">
            <div
              className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-200px mb-5 mb-xl-10"
              style={{
                backgroundColor: "#F1416C",
                backgroundImage: `url('${toAbsoluteUrl(
                  "media/patterns/vector-1.png"
                )}')`,
              }}
            >
              <div className="card-header py-5">
                <div className="card-title d-flex flex-column">
                  <span className="text-white pt-1 fw-semibold fs-3">
                    {intl.formatMessage({
                      id: "COMMON.SALES_PLAN_AND_RESULTS",
                    })}
                  </span>
                  <span className="fs-3hx fw-bold text-white mb-0">
                    96 257 000 {intl.formatMessage({ id: "COMMON.SUM" })}
                  </span>
                  <span className="fs-1hx fw-bold text-white lh-2h">
                    200 000 000 {intl.formatMessage({ id: "COMMON.SUM" })}
                  </span>
                </div>
              </div>
              <div className="card-body d-flex align-items-end pt-0">
                <div className="d-flex align-items-center flex-column mt-3 w-100">
                  <div className="d-flex justify-content-end fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">
                    <span>72%</span>
                  </div>
                  <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                    <div
                      className="bg-white rounded h-8px"
                      role="progressbar"
                      style={{ width: "72%" }}
                      aria-valuenow={50}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-md-6">
            <div
              className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-200px mb-5 mb-xl-10"
              style={{
                backgroundImage: `url('${toAbsoluteUrl(
                  "media/patterns/vector-1.png"
                )}')`,
              }}
            >
              <div className="card-header py-5">
                <div className="card-title d-flex flex-column">
                  <span className="text-black pt-1 fw-semibold fs-3">
                    {intl.formatMessage({ id: "COMMON.TOTAL_SALES_VOLUME" })}
                  </span>
                  <span className="fs-3hx fw-bold text-black mb-0">
                    {info?.totalSalesSumPricd || 0}{" "}
                    {intl.formatMessage({ id: "COMMON.SUM" })}
                  </span>
                  <span className="badge badge-light-success fs-1">
                    <KTIcon
                      iconName="arrow-up"
                      className="fs-5 text-success ms-n1"
                    />
                    {info?.result?.percent || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card card-stretch shadow flex-column-fluid">
              <div className="card-header border-0">
                <div className="card-toolbar">
                  <div className="btn btn btn-color-muted btn-active btn-active-primary active px-4 me-1">
                    {intl.formatMessage({ id: "COMMON.LEADERBOARD" })}
                  </div>
                  {/* <div className="btn btn btn-color-muted btn-active btn-active-primary px-4 me-1">
                    {intl.formatMessage({ id: "COMMON.BY_CASH_REGISTER" })}
                  </div>
                  <div className="btn btn btn-color-muted btn-active btn-active-primary px-4">
                    {intl.formatMessage({ id: "COMMON.PLAN_EXECUTION" })}
                  </div>
                  <div className="btn btn btn-color-muted btn-active btn-active-primary px-4">
                    {intl.formatMessage({ id: "COMMON.CONVERSION" })}
                  </div> */}
                </div>
              </div>

              <div className="card-body py-3">
                <div className="table-responsive">
                  <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                    <thead>
                      <tr className="fw-bold text-muted">
                        <th className="w-25px fs-2">#</th>
                        <th className="fs-2">
                          {intl.formatMessage({ id: "COMMON.MANAGER" })}
                        </th>
                        <th className="fs-2">
                          {intl.formatMessage({ id: "COMMON.DONE" })}
                        </th>
                        <th className="fs-2">
                          {intl.formatMessage({ id: "COMMON.PLAN" })}
                        </th>
                        {/* <th className="fs-2">
                          {intl.formatMessage({ id: "COMMON.INCOME" })}
                        </th> */}
                        <th className="fs-2">
                          {intl.formatMessage({ id: "COMMON.PROGRESS" })}
                        </th>
                        <th style={{ width: "10px" }}></th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index: number) => (
                        <tr key={index}>
                          <td>
                            <div className="symbol symbol-20px d-flex align-items-center justify-content-center pagination-tv-index">
                              {index + 1}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="symbol symbol-50px me-5 rounded">
                                <img
                                  style={{
                                    borderRadius: "50% !important",
                                  }}
                                  src={
                                    item.avatar.length > 0
                                      ? item.avatar
                                      : toAbsoluteUrl(
                                          "media/svg/avatars/blank.svg"
                                        )
                                  }
                                  alt={item.full_name}
                                />
                              </div>
                              <div className="d-flex justify-content-start flex-column">
                                <a
                                  href="#"
                                  className="text-gray-900 fw-bold fs-2"
                                >
                                  {item.full_name}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-gray-900 fw-bold d-block fs-2">
                              {item.done}
                            </div>
                          </td>
                          <td>
                            <div className="text-gray-900 fw-bold d-block fs-2">
                              {item.count_of_plan}
                            </div>
                          </td>
                          {/* <td>
                            <div className="text-gray-900 fw-bold d-block fs-2">
                              1 730 000
                            </div>
                          </td> */}
                          <td className="text-end">
                            <div className="d-flex flex-row w-100 me-2 align-items-center">
                              <div className="progress h-10px w-100">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: `${item.done_percent}%` }}
                                ></div>
                              </div>
                              <div className="d-flex flex-stack mb-2 ms-5">
                                <span className="text-gray-900 fw-bold d-block fs-2">
                                  {item.done_percent}%
                                </span>
                              </div>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export { DashboardWrapper };
