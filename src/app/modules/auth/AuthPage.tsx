import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { AuthLayout } from "./AuthLayout";
import { Registration } from "./components/Registration";

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />

      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
