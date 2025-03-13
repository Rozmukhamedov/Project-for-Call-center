import { FC, ReactNode } from "react";
import { Offcanvas, OffcanvasProps } from "react-bootstrap";
import { ESButton } from "../button";
import { useIntl } from "react-intl";
import { KTSVG } from "../../../_metronic/helpers";

import "./offcanvas.css";

export interface ESOffcanvasProps extends OffcanvasProps {
  header?: boolean;
  footer?: boolean;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  deleteBtn?: boolean;
  onClickDelete?: () => void;
  title?: string;
  onClick?: () => void;
  children?: ReactNode;
  width?: "w-25" | "w-50" | "w-75" | "w-30" | "w-40";
  dropdownItems?: ReactNode;
  placement?: "end" | "start";
}

const ESOffcanvas: FC<ESOffcanvasProps> = ({
  show,
  onHide,
  header = true,
  footer = true,
  headerContent,
  footerContent,
  deleteBtn = false,
  onClickDelete,
  title,
  onClick,
  children,
  width = "w-25",
  dropdownItems,
  placement = "end",
  ...props
}) => {
  const intl = useIntl();

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      className={`offcanvas es-offcanvas-right ${width}`}
      tabIndex={-1}
      placement={placement}
      {...props}
    >
      {header && (
        <>
          {headerContent || (
            <Offcanvas.Header className="d-flex justify-content-between">
              <Offcanvas.Title className="fs-3">{title}</Offcanvas.Title>

              {dropdownItems && (
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-icon btn-color-danger btn-active-light-danger me-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots fs-1"></i>
                  </button>
                  <ul className="dropdown-menu mt-2">{dropdownItems}</ul>
                </div>
              )}
              <div
                className="btn btn-icon btn-sm ms-2 position-absolute"
                style={{ left: -50, top: 10 }}
                onClick={onHide}
              >
                <KTSVG
                  path="media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x text-white svg-close-icon"
                />
              </div>
            </Offcanvas.Header>
          )}
        </>
      )}
      <Offcanvas.Body>{children}</Offcanvas.Body>
      {footer && (
        <>
          {footerContent || (
            <div className="offcanvas-footer py-3">
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
                className="btn btn-light me-2"
                onClick={onHide}
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
        </>
      )}
    </Offcanvas>
  );
};

export { ESOffcanvas };
