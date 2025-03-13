import { UsersIndex } from "../pages/users";
import { TemasIndex } from "../pages/teams";
import { EmployeesIndex } from "../pages/emplyees";
import { NotificationIndex } from "../pages/notification";
import { Route, Routes, Navigate } from "react-router-dom";
import { NotificationsIndex } from "../pages/notifications";
import { NotificationsTVIndex } from "../pages/notifications-tv";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="notifications-tv" element={<NotificationsTVIndex />} />

      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="notifications" element={<NotificationsIndex />} />
        <Route path="notifications/:id" element={<NotificationIndex />} />
        <Route path="teams" element={<TemasIndex />} />
        <Route path="employees" element={<EmployeesIndex />} />
        <Route path="users" element={<UsersIndex />} />

        {/* Lazy Modules */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
