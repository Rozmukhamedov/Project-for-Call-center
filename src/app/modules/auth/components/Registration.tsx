import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { getUserByToken, register } from "../core/_requests";
import { Link } from "react-router-dom";
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import { useAuth } from "../core/Auth";
import { useIntl } from "react-intl";
import {
  ApiError,
  notifyError,
} from "../../../../_metronic/helpers/notifyError";

export function Registration() {
  const intl = useIntl();

  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };

  const registrationSchema = Yup.object().shape({
    name: Yup.string()
      .min(
        3,
        intl.formatMessage({ id: "VALIDATION.MIN_SYMBOLS" }, { count: 3 })
      )
      .max(
        50,
        intl.formatMessage({ id: "VALIDATION.MAX_SYMBOLS" }, { count: 50 })
      )
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRED" })),
    email: Yup.string()
      .email("Wrong email format")
      .min(
        3,
        intl.formatMessage({ id: "VALIDATION.MIN_SYMBOLS" }, { count: 3 })
      )
      .max(
        50,
        intl.formatMessage({ id: "VALIDATION.MAX_SYMBOLS" }, { count: 50 })
      )
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRED" })),
    phone: Yup.string()
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

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await register(
          values.email,
          values.name,
          values.phone,
          values.password
        );
        console.log(auth);
        saveAuth(auth);
        const { data: user } = await getUserByToken(auth.token);
        setCurrentUser(user);
      } catch (error) {
        saveAuth(undefined);
        const apiError = error as ApiError;
        notifyError(intl, apiError.response.status);
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">
          {intl.formatMessage({ id: "COMMON.SIGN_UP" })}
        </h1>
      </div>

      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          {intl.formatMessage({ id: "COMMON.FULL_NAME" })}
        </label>
        <input
          placeholder={intl.formatMessage({ id: "COMMON.FULL_NAME" })}
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("name")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.name && formik.errors.name,
            },
            {
              "is-valid": formik.touched.name && !formik.errors.name,
            }
          )}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.name}</span>
            </div>
          </div>
        )}
      </div>
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          {intl.formatMessage({ id: "COMMON.PHONE" })}
        </label>
        <input
          placeholder={intl.formatMessage({ id: "COMMON.PHONE" })}
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("phone")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.phone && formik.errors.phone,
            },
            {
              "is-valid": formik.touched.phone && !formik.errors.phone,
            }
          )}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.phone}</span>
            </div>
          </div>
        )}
      </div>

      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          {intl.formatMessage({ id: "COMMON.EMAIL" })}
        </label>
        <input
          placeholder={intl.formatMessage({ id: "COMMON.EMAIL" })}
          type="email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>

      <div className="fv-row mb-8" data-kt-password-meter="true">
        <div className="mb-1">
          <label className="form-label fw-bolder text-gray-900 fs-6">
            {intl.formatMessage({ id: "COMMON.PASSWORD" })}
          </label>
          <div className="position-relative mb-3">
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
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
          <div
            className="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary w-100 mb-5"
        >
          {!loading && (
            <span className="indicator-label">
              {intl.formatMessage({ id: "COMMON.REGISTRATION" })}
            </span>
          )}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              {intl.formatMessage({ id: "PLEASE_WAIT" })}...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            {intl.formatMessage({ id: "COMMON.LOGIN" })}
          </button>
        </Link>
      </div>
    </form>
  );
}
