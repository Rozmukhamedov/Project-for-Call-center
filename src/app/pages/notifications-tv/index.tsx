import moment from "moment";
import { useIntl } from "react-intl";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../../_metronic/hook/apiClient";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { ESPagination, ESPaginationSize } from "../../components";
import { Content } from "../../../_metronic/layout/components/content";
import { ApiError, notifyError } from "../../../_metronic/helpers/notifyError";

export interface QueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  date?: string;
}

export type NotificationType = {
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

export const NotificationsTVIndex: FC = () => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<NotificationType[]>([]);

  // QUERY PARAMS
  const page = parseInt(searchParams.get("page") as string, 10) || 1;
  const page_size = parseInt(searchParams.get("page_size") as string, 10) || 20;
  const search = searchParams.get("search") || "";
  const date = searchParams.get("date") || moment().format("YYYY-MM-DD");
  const [totalPageCount, setTotalPageCount] = useState(
    parseInt(searchParams.get("total_page_count") as string, 10) || 1
  );
  const [selectedDateLabel, setSelectedDateLabel] = useState("Сегодня");

  const buildQueryParams = () => {
    let query = `?page=${page}&page_size=${page_size}`;
    if (search) query += `&search=${search}`;
    if (date) query += `&date=${date}`;
    return query;
  };

  // GET DATA
  async function getData() {
    try {
      const res = await apiClient.get(
        `/statistics/get-employee-leader${buildQueryParams()}`
      );
      setData(res.data.data.employees || []);
      setTotalPageCount(res.data.meta.total || 1);
    } catch (error) {
      const apiError = error as ApiError;
      notifyError(intl, apiError.response.status);
    }
  }

  useEffect(() => {
    getData();
  }, [searchParams]);

  // OTHER
  const changeQueryParams = (param: QueryParams) => {
    Object.entries(param).forEach(([name, value]) => {
      searchParams.set(name, `${value}`);
    });

    setSearchParams(searchParams);
  };
  return (
    <>
      <Content>
        <div className="h-100 d-flex flex-column flex-column-fluid">
          <div className="card card-stretch shadow flex-column-fluid">
            <div className="card-header border-0">
              <div className="d-flex align-items-center justify-content-between w-100">
                <h1
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  {intl.formatMessage({ id: "COMMON.LEADERBOARD" })}
                </h1>
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedDateLabel}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          changeQueryParams({
                            date: moment().format("YYYY-MM-DD"),
                          });

                          setSelectedDateLabel("Сегодня");
                        }}
                      >
                        {intl.formatMessage({ id: "COMMON.TODAY" })}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          changeQueryParams({
                            date: moment()
                              .subtract(1, "days")
                              .format("YYYY-MM-DD"),
                          });
                          setSelectedDateLabel("Вчера");
                        }}
                      >
                        {intl.formatMessage({ id: "COMMON.YESTERDAY" })}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          changeQueryParams({
                            date: moment()
                              .subtract(7, "days")
                              .format("YYYY-MM-DD"),
                          });
                          setSelectedDateLabel("7 дней назад");
                        }}
                      >
                        {intl.formatMessage({ id: "COMMON.SEVEN_DAYS_AGO" })}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body py-3">
              <div className="table-responsive">
                <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  <thead>
                    <tr className="fw-bold text-muted">
                      <th className="w-25px fs-2">
                        {intl.formatMessage({ id: "COMMON.RANK" })}
                      </th>
                      <th className="fs-2">
                        {intl.formatMessage({ id: "COMMON.NAME" })}
                      </th>
                      <th className="fs-2">
                        {intl.formatMessage({ id: "COMMON.TRADES" })}
                      </th>
                      <th className="fs-2">
                        {intl.formatMessage({ id: "COMMON.BUDGET" })}
                      </th>
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
                          {index === 0 && (
                            <div className="symbol symbol-45px d-flex align-items-center justify-content-center">
                              <img
                                src={toAbsoluteUrl("media/place/first.svg")}
                                alt=""
                              />
                            </div>
                          )}
                          {index === 1 && (
                            <div className="symbol symbol-45px d-flex align-items-center justify-content-center">
                              <img
                                src={toAbsoluteUrl("media/place/second.svg")}
                                alt=""
                              />
                            </div>
                          )}
                          {index === 2 && (
                            <div className="symbol symbol-45px d-flex align-items-center justify-content-center">
                              <img
                                src={toAbsoluteUrl("media/place/third.svg")}
                                alt=""
                              />
                            </div>
                          )}
                          {index > 2 && (
                            <div className="symbol symbol-45px d-flex align-items-center justify-content-center pagination-tv-index">
                              {index + 1}
                            </div>
                          )}
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
                            {item?.count_of_plan}{" "}
                            {intl.formatMessage({ id: "COMMON.SHARES" })}
                          </div>
                        </td>
                        <td>
                          <div className="text-gray-900 fw-bold d-block fs-2">
                            {item?.done}{" "}
                            {intl.formatMessage({ id: "COMMON.SUM" })}
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex flex-row w-100 me-2 align-items-center">
                            <div className="progress h-10px w-100">
                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: `${item?.done_percent || 0}%` }}
                              ></div>
                            </div>
                            <div className="d-flex flex-stack mb-2 ms-5">
                              <span className="text-gray-900 fw-bold d-block fs-2">
                                {item?.done_percent || 0}%
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
            <div className="w-100 d-flex justify-content-between px-4 pb-5">
              <ESPaginationSize
                value={page_size}
                onChange={(e) =>
                  changeQueryParams({
                    page_size: e,
                  })
                }
              />
              <ESPagination
                items={totalPageCount}
                itemsPerPage={page}
                pageSize={page_size}
                onPageChange={(page) =>
                  changeQueryParams({
                    page: page,
                  })
                }
                page={page}
              />
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};
