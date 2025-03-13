import { useIntl } from "react-intl";
import { ESModal } from "../../../../app/components";
import { toAbsoluteUrl } from "../../../helpers";
import { formatNumber } from "../../../helpers/utils";

type LeaderOfDayType = {
  team_id: number;
  data: {
    full_name: string;
    progress: number;
    deal_count: number;
    total_price: number;
  }[];
};

type ModalLeaderOfDayType = {
  data: LeaderOfDayType | null;
  show: boolean;
  onHide: () => void;
};

function ModalLeaderOfDay({ show, onHide, data }: ModalLeaderOfDayType) {
  const intl = useIntl();

  return (
    <ESModal
      show={show}
      onHide={onHide}
      header={false}
      footer={false}
      size="lg"
      className="modal-leader-of-day"
    >
      <h3 className="fs-1 mb-3">
        {intl.formatMessage({ id: "COMMON.BEST_OF_THE_DAY" })}
      </h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card card-second">
            <div className="card-header">
              <div className="place">2-й</div>
              <img src={toAbsoluteUrl("media/svg/avatars/blank.svg")} alt="" />
            </div>
            <div className="card-body">
              <div className="name">{data?.data?.[1].full_name}</div>
              <div className="info">
                <div className="d-flex justify-content-between">
                  <div className="transaction">
                    <div className="title">
                      {intl.formatMessage({ id: "COMMON.TRANSACTION" })}
                    </div>
                    <p>
                      {data?.data?.[1].deal_count}{" "}
                      {intl.formatMessage({ id: "COMMON.PCS" })}
                    </p>
                  </div>
                  <div className="nn-progress">
                    <div className="title">
                      {intl.formatMessage({ id: "COMMON.PROGRESS" })}
                    </div>
                    <p>{data?.data?.[1].progress}%</p>
                  </div>
                </div>
                <div className="budget">
                  <div className="title">
                    {intl.formatMessage({ id: "COMMON.BUDGET" })}
                  </div>
                  <p>
                    {formatNumber(data?.data?.[1].total_price)}{" "}
                    {intl.formatMessage({ id: "COMMON.SUM" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-first">
            <div className="card-header">
              <div className="place">1-й</div>
              <img src={toAbsoluteUrl("media/svg/avatars/blank.svg")} alt="" />
            </div>
            <div className="card-body">
              <div className="name">{data?.data?.[0].full_name}</div>
              <div className="info">
                <div className="d-flex justify-content-between">
                  <div className="transaction">
                    <div className="title">
                      {intl.formatMessage({ id: "COMMON.TRANSACTION" })}
                    </div>
                    <p>
                      {data?.data?.[0].deal_count}{" "}
                      {intl.formatMessage({ id: "COMMON.PCS" })}
                    </p>
                  </div>
                  <div className="nn-progress">
                    <div className="title">
                      {intl.formatMessage({ id: "COMMON.PROGRESS" })}
                    </div>
                    <p>{data?.data?.[0].progress}%</p>
                  </div>
                </div>
                <div className="budget">
                  <div className="title">
                    {intl.formatMessage({ id: "COMMON.BUDGET" })}
                  </div>
                  <p>
                    {formatNumber(data?.data?.[0].total_price)}{" "}
                    {intl.formatMessage({ id: "COMMON.SUM" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-third">
            <div className="card-header">
              <div className="place">3-й</div>
              <img src={toAbsoluteUrl("media/svg/avatars/blank.svg")} alt="" />
            </div>
            <div className="card-body">
              <div className="name">{data?.data?.[2].full_name}</div>
              <div className="info">
                <div className="d-flex justify-content-between">
                  <div className="transaction">
                    <div className="title">
                      {intl.formatMessage({ id: "COMMON.TRANSACTION" })}
                    </div>
                    <p>
                      {data?.data?.[2].deal_count}{" "}
                      {intl.formatMessage({ id: "COMMON.PCS" })}
                    </p>
                  </div>
                  <div className="nn-progress">
                    <div className="title">
                      {intl.formatMessage({ id: "COMMON.PROGRESS" })}
                    </div>
                    <p>{data?.data?.[2].progress}%</p>
                  </div>
                </div>
                <div className="budget">
                  <div className="title">
                    {intl.formatMessage({ id: "COMMON.BUDGET" })}
                  </div>
                  <p>
                    {formatNumber(data?.data?.[2].total_price)}{" "}
                    {intl.formatMessage({ id: "COMMON.SUM" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ESModal>
  );
}

export default ModalLeaderOfDay;
