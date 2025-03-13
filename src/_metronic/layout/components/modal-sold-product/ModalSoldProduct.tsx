import { useIntl } from "react-intl";
import { ESModal } from "../../../../app/components";
import { toAbsoluteUrl } from "../../../helpers";

type ModalSoldProductType = {
  show: boolean;
  onHide: () => void;
  name?: string;
};

function ModalSoldProduct({
  show,
  onHide,
  name,
}: ModalSoldProductType) {
  const intl = useIntl();

  return (
    <ESModal
      show={show}
      onHide={onHide}
      header={false}
      footer={false}
      size="lg"
      className="modal-sold-product"
    >
      <div className="text-center mt-20 mb-20">
        <div className="logo">
          <img src={toAbsoluteUrl("media/svg/avatars/blank.svg")} alt="" />
        </div>
        <div className="modal-employee">{name || ""}</div>
        <div className="modal-title">
          {intl.formatMessage({ id: "COMMON.CONGRATULATIONS" })} <br />
          <span>
            {intl.formatMessage({
              id: "COMMON.ON_THE_SUCCESSFUL_IMPLEMENTATION",
            })}
            !
          </span>
        </div>
        <img
          className="tada"
          src={toAbsoluteUrl("media/svg/general/tada.png")}
          alt="tada"
        />
        <img
          className="confetti-ball"
          src={toAbsoluteUrl("media/svg/general/confetti_ball.png")}
          alt="confetti ball"
        />
      </div>
    </ESModal>
  );
}

export default ModalSoldProduct;
