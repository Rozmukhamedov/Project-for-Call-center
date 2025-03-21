import clsx from "clsx";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../helpers";
import { HeaderUserMenu, ThemeModeSwitcher } from "../../../partials";

const itemClass = "ms-1 ms-md-4";
const userAvatarClass = "symbol-35px";

const Navbar = () => {
  const intl = useIntl();

  return (
    <div className="app-navbar flex-shrink-0">
      <div
        className={clsx("app-navbar-item d-flex align-items-center", itemClass)}
      >
        <p className="anchor fw-bolder mb-0">
          {intl.formatMessage({ id: "COMMON.TIME" })}: 9:00 - 18:00
        </p>
      </div>
      <div className={clsx("app-navbar-item", itemClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx("btn-active-light-primary btn-custom")}
        />
      </div>
      <div className={clsx("app-navbar-item", itemClass)}>
        <div
          className={clsx("cursor-pointer symbol", userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <img src={toAbsoluteUrl("media/avatars/blank.png")} alt="" />
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  );
};

export { Navbar };
