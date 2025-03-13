import clsx from "clsx";
import { Navbar } from "./Navbar";
import { useLayout } from "../../core";
import { Link } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";

export function HeaderWrapper() {
  const { config, classes } = useLayout();

  return (
    <div id="kt_app_header" className="app-header">
      <div
        id="kt_app_header_container"
        className={clsx(
          "app-container",
          classes.headerContainer.join(" "),
          config.app?.header?.default?.containerClass
        )}
      >
        {config.app?.sidebar?.display && (
          <>
            {config.layoutType !== "dark-header" &&
            config.layoutType !== "light-header" ? (
              <div
                className="d-flex align-items-center d-lg-none ms-n2 me-2"
                title="Show sidebar menu"
              >
                <div
                  className="btn btn-icon btn-active-color-primary w-35px h-35px"
                  id="kt_app_sidebar_mobile_toggle"
                >
                  <KTIcon iconName="abstract-14" className=" fs-1" />
                </div>
                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                  <Link to="/dashboard" className="d-lg-none">
                    <img
                      alt="Logo"
                      src={toAbsoluteUrl("media/logos/default-small.svg")}
                      className="h-30px"
                    />
                  </Link>
                </div>
              </div>
            ) : null}
          </>
        )}

        <div
          id="kt_app_header_wrapper"
          className="d-flex align-items-stretch justify-content-end flex-lg-grow-1"
        >
          <Navbar />
        </div>
      </div>
    </div>
  );
}
