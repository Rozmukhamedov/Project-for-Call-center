import * as Yup from "yup";
import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import apiClient from "../../../../_metronic/hook/apiClient";
import { KPI_STATUSES } from "../../../../_metronic/helpers/contants";
import {
  ESInput,
  ESOffcanvas,
  ESToggle,
  ESConfirmationModal,
  ESTextarea,
  ESInputSelect,
} from "../../../components";
import {
  ApiError,
  notifyError,
} from "../../../../_metronic/helpers/notifyError";

type AddOffcanvasPropsType = {
  show: boolean;
  onHide: () => void;
  refetch: () => void;
};

export const AddOffcanvas: FC<AddOffcanvasPropsType> = ({
  show,
  onHide,
  refetch,
}) => {
  const intl = useIntl();

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const validationSchema = Yup.object({
    name: Yup.string().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
    bitrix_api: Yup.string().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
    active_at: Yup.string().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
    stages: Yup.string().max(
      250,
      intl.formatMessage({ id: "VALIDATION.MAX_NUMBER" }, { number: 250 })
    ),
    kpi_type: Yup.string().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
    is_active: Yup.boolean(),
    is_trial: Yup.boolean(),
  });

  const initialValues = {
    name: "",
    bitrix_api: "",
    active_at: "",
    stages: "",
    kpi_type: "",
    is_active: true,
    is_trial: false,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);

      try {
        await apiClient.post("/teams", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        resetForm();
        onHide();
        refetch();
        toast.success(intl.formatMessage({ id: "NOTIFICATION.UPDATED" }));
      } catch (error) {
        const apiError = error as ApiError;
        notifyError(intl, apiError.response.status);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOnHide = () => {
    if (formik.dirty) {
      setShowConfirmationModal(true);
    } else {
      onHide();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmationModal(false);
    formik.resetForm();
    onHide();
  };

  return (
    <>
      <ESOffcanvas
        show={show}
        onHide={handleOnHide}
        title={intl.formatMessage({ id: "COMMON.CREATE_TEAM" })}
        width={"w-25"}
        onClick={() => formik.handleSubmit()}
      >
        <div className="row">
          <div className="col-md-12 mb-3">
            <ESInput
              label={intl.formatMessage({ id: "COMMON.NAME" })}
              {...formik.getFieldProps("name")}
              touched={formik.touched.name}
              errors={formik.errors.name}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <ESInput
              label={intl.formatMessage({ id: "COMMON.BITRIX_API" })}
              {...formik.getFieldProps("bitrix_api")}
              touched={formik.touched.bitrix_api}
              errors={formik.errors.bitrix_api}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <ESInput
              type="date"
              label={intl.formatMessage({ id: "COMMON.ACTIVE_AT" })}
              {...formik.getFieldProps("active_at")}
              touched={formik.touched.active_at}
              errors={formik.errors.active_at}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <ESTextarea
              label={intl.formatMessage({ id: "COMMON.STAGES" })}
              onChange={(e) => formik.setFieldValue("stages", e)}
              touched={formik.touched.stages}
              errors={formik.errors.stages}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <ESInputSelect
              label={intl.formatMessage({ id: "COMMON.KPI_TYPE" })}
              options={KPI_STATUSES.map((item) => ({
                ...item,
                label: intl.formatMessage({ id: item.label }),
              }))}
              value={formik.values.kpi_type}
              onChange={(option) =>
                formik.setFieldValue("kpi_type", option?.value)
              }
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <ESToggle
              value={formik.values.is_trial}
              onChange={(value) => formik.setFieldValue("is_trial", value)}
              label={intl.formatMessage({ id: "COMMON.IS_TRIAL" })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <ESToggle
              value={formik.values.is_active}
              onChange={(value) => formik.setFieldValue("is_active", value)}
              label={intl.formatMessage({ id: "COMMON.IS_ACTIVE" })}
            />
          </div>
        </div>
      </ESOffcanvas>

      {/* Модальное окно подтверждения */}
      <ESConfirmationModal
        show={showConfirmationModal}
        onConfirmHide={handleConfirmClose}
        onHide={() => setShowConfirmationModal(false)}
      />
    </>
  );
};
