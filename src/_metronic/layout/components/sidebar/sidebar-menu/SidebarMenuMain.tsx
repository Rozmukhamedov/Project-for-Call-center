import { useIntl } from "react-intl";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />

      <SidebarMenuItem
        to="/notifications"
        icon="information-5"
        title={intl.formatMessage({ id: "MENU.LEADS" })}
        fontIcon="bi-app-indicator"
      />

      <SidebarMenuItem
        to="/employees"
        icon="people"
        title={intl.formatMessage({ id: "MENU.EMPLOYEES" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/teams"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.TEAMS" })}
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/users"
        icon="profile-user"
        title={intl.formatMessage({ id: "MENU.USERS" })}
        fontIcon="bi-app-indicator"
      />
    </>
  );
};

export { SidebarMenuMain };
