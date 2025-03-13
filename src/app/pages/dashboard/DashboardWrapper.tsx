import { useIntl } from "react-intl";
import { ESInput } from "../../components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../../_metronic/hook/apiClient";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ApiError, notifyError } from "../../../_metronic/helpers/notifyError";

export type UserType = {
  id: number;
  password: string;
  name: string | null;
  telegram_id: string;
  email: string;
  email_verified_at: string;
  phone: string;
  phone_verified_at: string;
  super_admin: number;
  created_at: string;
};

export interface QueryParams {
  date?: string;
}

const DashboardWrapper = () => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState([{}, {}, {}, {}]);

  // QUERY PARAMS
  const date = parseInt(searchParams.get("date") || "");

  const buildQueryParams = () => {
    const query = `?date=${date}`;

    return query;
  };

  // GET DATA
  async function getData() {
    try {
      const res = await apiClient.get(`/app${buildQueryParams()}`);
      // setData(res.data.data || []);

      const resLeader = await apiClient.get(
        `/statistics/get-employee-leader${buildQueryParams()}`
      );
      console.log(resLeader);

      const resStats = await apiClient.get(
        `/statistics/get-statistics${buildQueryParams()}`
      );
      console.log(resData);
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
                      69 700 {intl.formatMessage({ id: "COMMON.SHARES" })}
                    </span>

                    <span className="badge badge-light-success fs-1">
                      <KTIcon
                        iconName="arrow-up"
                        className="fs-5 text-success ms-n1"
                      />
                      2.2%
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
                      id: "COMMON.TOTAL_NUMBER_OF_LEADS",
                    })}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2 me-20">
                      17 854 ta
                    </span>

                    <span className="badge badge-light-danger fs-1">
                      <KTIcon
                        iconName="arrow-down"
                        className="fs-5 text-danger ms-n1"
                      />
                      2.2%
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
                      id: "COMMON.NUMBER_OF_QUALITY_LEADS",
                    })}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2 me-20">
                      3 325 ta
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
                    {intl.formatMessage({ id: "COMMON.CONVERSION" })}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2 me-20">
                      19.69%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
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
          </div>
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
                    287 765 000 {intl.formatMessage({ id: "COMMON.SUM" })}
                  </span>
                  <span className="badge badge-light-success fs-1">
                    <KTIcon
                      iconName="arrow-up"
                      className="fs-5 text-success ms-n1"
                    />
                    2.2%
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
                  <div className="btn btn btn-color-muted btn-active btn-active-primary px-4 me-1">
                    {intl.formatMessage({ id: "COMMON.BY_CASH_REGISTER" })}
                  </div>
                  <div className="btn btn btn-color-muted btn-active btn-active-primary px-4">
                    {intl.formatMessage({ id: "COMMON.PLAN_EXECUTION" })}
                  </div>
                  <div className="btn btn btn-color-muted btn-active btn-active-primary px-4">
                    {intl.formatMessage({ id: "COMMON.CONVERSION" })}
                  </div>
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
                        <th className="fs-2">
                          {intl.formatMessage({ id: "COMMON.INCOME" })}
                        </th>
                        <th className="fs-2">
                          {intl.formatMessage({ id: "COMMON.PROGRESS" })}
                        </th>
                        <th style={{ width: "10px" }}></th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((_, index: number) => (
                        <tr key={index}>
                          <td>
                            <div className="symbol symbol-45px d-flex align-items-center justify-content-center">
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
                                  src={toAbsoluteUrl(
                                    "media/svg/avatars/blank.svg"
                                  )}
                                  alt=""
                                />
                              </div>
                              <div className="d-flex justify-content-start flex-column">
                                <a
                                  href="#"
                                  className="text-gray-900 fw-bold fs-2"
                                >
                                  Ilhomjon Akbarov
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-gray-900 fw-bold d-block fs-2">
                              1 730 000
                            </div>
                          </td>
                          <td>
                            <div className="text-gray-900 fw-bold d-block fs-2">
                              1 730 000
                            </div>
                          </td>
                          <td>
                            <div className="text-gray-900 fw-bold d-block fs-2">
                              1 730 000
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="d-flex flex-row w-100 me-2 align-items-center">
                              <div className="progress h-10px w-100">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: "50%" }}
                                ></div>
                              </div>
                              <div className="d-flex flex-stack mb-2 ms-5">
                                <span className="text-gray-900 fw-bold d-block fs-2">
                                  50%
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
