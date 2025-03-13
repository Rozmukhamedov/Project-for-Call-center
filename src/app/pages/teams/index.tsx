import moment from "moment";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../../_metronic/hook/apiClient";
import { FC, ReactNode, useEffect, useState } from "react";
import { KTIcon, KTSVG } from "../../../_metronic/helpers";
import { AddOffcanvas, EditOffcanvas } from "./components";
import { Content } from "../../../_metronic/layout/components/content";
import { ApiError, notifyError } from "../../../_metronic/helpers/notifyError";
import {
  ESButton,
  ESModalDelete,
  ESPagination,
  ESPaginationSize,
  ESTable,
} from "../../components";

export interface QueryParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export type TeamType = {
  id: number;
  name: string;
  bitrix_api: string;
  active_at: string;
  is_active: boolean;
  is_trial: boolean;
};

export const TemasIndex: FC = () => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<TeamType[]>([]);

  const [choosenItem, setChoosenItem] = useState<TeamType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");

  const [addOffcanvasShow, setAddOfcanvasShow] = useState<boolean>(false);
  const [editOffcanvasShow, setEditOffcanvasShow] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // QUERY PARAMS
  const page = parseInt(searchParams.get("page") as string, 10) || 1;
  const page_size = parseInt(searchParams.get("page_size") as string, 10) || 20;
  const search = searchParams.get("search") || "";
  const [totalPageCount, setTotalPageCount] = useState(
    parseInt(searchParams.get("total_page_count") as string, 10) || 1
  );

  const buildQueryParams = () => {
    let query = `?page=${page}&page_size=${page_size}`;
    if (search) query += `&search=${search}`;

    return query;
  };

  // GET DATA
  async function getData() {
    try {
      const res = await apiClient.get(`/teams${buildQueryParams()}`);
      setData(res.data.data || []);
      setTotalPageCount(res.data.meta.total);
      setIsLoading(false);
    } catch (error) {
      const apiError = error as ApiError;
      notifyError(intl, apiError.response.status);
    }
  }

  useEffect(() => {
    getData();
  }, [searchParams]);

  // TABLE COMPONENT
  const [tableThead] = useState([
    {
      title: intl.formatMessage({ id: "COMMON.ID" }),
      key: "id",
      isActive: true,
      disabled: true,
      className: "w-25px text-center",
    },
    {
      title: intl.formatMessage({ id: "COMMON.NAME" }),
      key: "name",
      isActive: true,
      disabled: true,
    },
    {
      title: intl.formatMessage({ id: "COMMON.BITRIX_API" }),
      key: "bitrix_api",
      isActive: true,
      disabled: true,
    },
    {
      title: intl.formatMessage({ id: "COMMON.ACTIVE_AT" }),
      key: "active_at",
      isActive: true,
      disabled: true,
    },
    {
      title: intl.formatMessage({ id: "COMMON.IS_TRIAL" }),
      key: "is_trial",
      isActive: true,
      disabled: true,
    },
    {
      title: intl.formatMessage({ id: "COMMON.IS_ACTIVE" }),
      key: "is_active",
      isActive: true,
      disabled: true,
    },
    {
      title: "",
      key: "actions",
      className: "w-50px",
      disabled: true,
    },
  ]);

  const renderTableRow = (
    value: TeamType,
    selectedItems: number[],
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    const isSelected = selectedItems.includes(value.id);

    const handleCheckboxChange = (id: number) => {
      setSelectedItems(
        (prevSelected) =>
          prevSelected.includes(id)
            ? prevSelected.filter((itemId) => itemId !== id) // Удалить из массива
            : [...prevSelected, id] // Добавить в массив
      );
    };

    return (
      <tr
        key={`list-${value.id}`}
        onDoubleClick={(e) => {
          setChoosenItem(value);
          setEditOffcanvasShow(true);
          e.stopPropagation();
        }}
      >
        {/* Чекбокс */}
        <th className="w-25px ps-3 align-middle">
          <div className="form-check form-check-sm form-check-custom form-check-solid">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isSelected} // Контролируемое состояние чекбокса
              onChange={(e) => {
                handleCheckboxChange(value.id);
                e.stopPropagation();
              }}
            />
          </div>
        </th>

        {/* Генерация ячеек для видимых колонок */}
        {tableThead.map(
          (column) =>
            column.isActive && (
              <td
                key={`${column.key}-${value.id}`}
                className={`align-middle ${column.className}`}
              >
                {renderColumnData(
                  column.key,
                  value[column.key as keyof TeamType]
                )}
              </td>
            )
        )}

        {/* Действия */}
        <td className="d-flex justify-content-end align-middle">
          <button
            type="button"
            onClick={() => {
              setChoosenItem(value);
              setEditOffcanvasShow(true);
            }}
            className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
          >
            <KTIcon iconName="pencil" className="fs-3" />
          </button>
          <button
            type="button"
            onClick={() => {
              setChoosenItem(value);
              setShowDeleteModal(true);
            }}
            className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
          >
            <KTIcon iconName="trash" className="fs-3" />
          </button>
        </td>
      </tr>
    );
  };

  const renderColumnData = (
    key: string,
    value: TeamType[keyof TeamType]
  ): ReactNode => {
    switch (key) {
      case "is_trial":
      case "is_active":
        return value ? (
          <span className="badge badge-light-success">
            {intl.formatMessage({ id: "COMMON.YES" })}
          </span>
        ) : (
          <span className="badge badge-light-danger">
            {intl.formatMessage({ id: "COMMON.NO" })}
          </span>
        );

      case "active_at":
        return value ? moment(value.toString()).format("DD.MM.YYYY") : "";

      default:
        return value ? value.toString() : "";
    }
  };

  // Visisble Column
  // Пересчёт "Выбрать все"

  // OTHER
  const changeSelectedItems = (data: TeamType[]) => {
    if (data.length <= selectedItems.length) {
      setSelectedItems([]);
      return;
    }
    setSelectedItems(data.map((item: TeamType) => item.id));
  };

  const changeQueryParams = (param: QueryParams) => {
    Object.entries(param).forEach(([name, value]) => {
      searchParams.set(name, `${value}`);
    });

    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (search != "") {
      setSearchName(search);
    }
  }, []);

  return (
    <>
      <Content>
        <div className="h-100 d-flex flex-column flex-column-fluid">
          <div className="card card-stretch shadow flex-column-fluid">
            <div className="card-header border-0">
              <div className="d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center position-relative input-group-sm my-1 me-3">
                  <input
                    type="text"
                    data-kt-user-table-filter="search"
                    className="form-control form-control-solid w-200px"
                    placeholder={intl.formatMessage({ id: "COMMON.SEARCH" })}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  {searchName.length > 0 && (
                    <div
                      className="btn btn-icon btn-sm position-absolute search-close"
                      onClick={() => {
                        setSearchName("");
                        changeQueryParams({ search: "", page: 1 });
                      }}
                    >
                      <KTSVG
                        path="media/icons/duotune/arrows/arr061.svg"
                        className="svg-icon svg-icon-2x text-danger svg-close-icon"
                      />
                    </div>
                  )}
                </div>
                <ESButton
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    searchName !== "" &&
                      changeQueryParams({
                        search: searchName,
                        page: 1,
                      });
                  }}
                >
                  {intl.formatMessage({ id: "COMMON.SEARCH" })}
                </ESButton>
              </div>
              <div className="card-toolbar">
                <ESButton
                  className="btn btn-danger btn-sm ms-3"
                  onClick={() => setAddOfcanvasShow(true)}
                >
                  {intl.formatMessage({ id: "COMMON.ADD" })}
                </ESButton>
              </div>
            </div>
            <div className="card-body main-overflow-x pt-0">
              <ESTable
                isLoading={isLoading}
                thead={tableThead}
                data={data.length}
                selectedItems={selectedItems.length}
                onChageSelectedItems={() => changeSelectedItems(data)}
              >
                {data.map((item) =>
                  renderTableRow(item, selectedItems, setSelectedItems)
                )}
              </ESTable>
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

      <AddOffcanvas
        show={addOffcanvasShow}
        onHide={() => setAddOfcanvasShow(false)}
        refetch={getData}
      />
      <EditOffcanvas
        show={editOffcanvasShow}
        onHide={() => {
          setEditOffcanvasShow(false);
        }}
        choosenItem={choosenItem}
        setShowDeleteModal={() => setShowDeleteModal(true)}
        refetch={getData}
      />

      <ESModalDelete
        refetch={getData}
        setEditOffcanvasShow={() => {
          setEditOffcanvasShow(false);
          setChoosenItem(null);
        }}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        url={`/teams/${choosenItem?.id}`}
      />
    </>
  );
};
