import { FC, ReactNode } from "react";
import { KTSVG } from "../../../_metronic/helpers";
import { Modal, ModalProps } from "react-bootstrap";
import { ESButton } from "../button";
import { useIntl } from "react-intl";

export interface ESModalProps extends ModalProps {
  header?: boolean;
  className?: string;
  headerClassName?: string;
  footer?: boolean;
  footerClassName?: string;
  deleteBtn?: boolean;
  onClickDelete?: () => void;
  title?: string;
  onClick?: () => void;
  isSaveLoading?: boolean;
  isCloseDisabled?: boolean;
  size?: "sm" | "lg" | "xl";
  closeOnEscape?: boolean;
  children?: ReactNode;
}

const ESModal: FC<ESModalProps> = ({
  show,
  onHide,
  header = true,
  footer = true,
  deleteBtn = false,
  onClickDelete,
  title,
  onClick,
  isCloseDisabled = false,
  className = "",
  headerClassName = "",
  footerClassName = "",
  size,
  closeOnEscape = true,
  children,
  dialogClassName,
}) => {
  const intl = useIntl();

  return (
    <Modal
      show={show}
      onHide={onHide}
      className={`modal fade ${size} ${className}`}
      tabIndex={-1}
      dialogClassName={dialogClassName}
      keyboard={closeOnEscape}
      centered
      size={size}
    >
      <div className="modal-content">
        {header && (
          <div
            className={`modal-header d-flex justify-content-between py-3 ${headerClassName}`}
          >
            <h5 className="modal-title">{title}</h5>
            <div
              className="btn btn-icon btn-sm btn-active-light-primary ms-2"
              onClick={onHide}
            >
              <KTSVG
                path="media/icons/duotune/arrows/arr061.svg"
                className="svg-icon svg-icon-2x"
              />
            </div>
          </div>
        )}

        <div className="modal-body">{children}</div>

        {footer && (
          <div className={`modal-footer py-3 ${footerClassName}`}>
            {deleteBtn && (
              <button
                type="button"
                className="btn btn-danger me-auto btn-sm"
                onClick={onClickDelete}
              >
                {intl.formatMessage({ id: "COMMON.DELETE" })}
              </button>
            )}

            <ESButton
              type="button"
              className="btn btn-light"
              onClick={onHide}
              disabled={isCloseDisabled}
            >
              {intl.formatMessage({ id: "COMMON.CLOSE" })}
            </ESButton>
            <ESButton
              type="button"
              className="btn btn-danger"
              onClick={onClick}
            >
              {intl.formatMessage({ id: "COMMON.SAVE" })}
            </ESButton>
          </div>
        )}
      </div>
    </Modal>
  );
};

export { ESModal };
