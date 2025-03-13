import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { useAuth } from "../core/Auth";
import { useIntl } from "react-intl";
import {
  ApiError,
  notifyError,
} from "../../../../_metronic/helpers/notifyError";
import { getUserByToken, login } from "../core/_requests";

export function Login() {
  const intl = useIntl();

  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage({ id: "VALIDATION.EMAIL" }))
      .min(
        3,
        intl.formatMessage({ id: "VALIDATION.MIN_SYMBOLS" }, { count: 3 })
      )
      .max(
        50,
        intl.formatMessage({ id: "VALIDATION.MAX_SYMBOLS" }, { count: 50 })
      )
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRED" })),
    password: Yup.string()
      .min(
        3,
        intl.formatMessage({ id: "VALIDATION.MIN_SYMBOLS" }, { count: 3 })
      )
      .max(
        50,
        intl.formatMessage({ id: "VALIDATION.MAX_SYMBOLS" }, { count: 50 })
      )
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRED" })),
  });

  const initialValues = {
    email: "workislom@gmail.com",
    password: "12345islom",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.email, values.password);
        saveAuth(auth);
        const { data } = await getUserByToken(auth?.token);
        setCurrentUser(data);
      } catch (error) {
        saveAuth(undefined);
        const apiError = error as ApiError;
        notifyError(intl, apiError.response.status);
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">
          {intl.formatMessage({ id: "COMMON.SIGN_IN" })}
        </h1>
      </div>
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">
          {intl.formatMessage({ id: "COMMON.EMAIL" })}
        </label>
        <input
          placeholder={intl.formatMessage({ id: "COMMON.EMAIL" })}
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          {intl.formatMessage({ id: "COMMON.PASSWORD" })}
        </label>
        <input
          type="password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.password && formik.errors.password,
            },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary mb-3"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && (
            <span className="indicator-label">
              {intl.formatMessage({ id: "COMMON.CONTINUE" })}
            </span>
          )}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              {intl.formatMessage({ id: "COMMON.PLEASE_WAIT" })}...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        {/* <Link to="/auth/register">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            {intl.formatMessage({ id: "COMMON.REGISTRATION" })}
          </button>
        </Link> */}
      </div>
    </form>
  );
}
