import * as Yup from "yup";
import moment from "moment";
import { TeamType } from "..";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import apiClient from "../../../../_metronic/hook/apiClient";
import { KPI_STATUSES } from "../../../../_metronic/helpers/contants";
import {
  ESConfirmationModal,
  ESInput,
  ESInputSelect,
  ESOffcanvas,
  ESTextarea,
  ESToggle,
} from "../../../components";
import {
  ApiError,
  notifyError,
} from "../../../../_metronic/helpers/notifyError";

type EditOffcanvasPropsType = {
  show: boolean;
  onHide: () => void;
  choosenItem: TeamType | null;
  setShowDeleteModal: () => void;
  refetch: () => void;
};

export const EditOffcanvas: FC<EditOffcanvasPropsType> = ({
  show,
  onHide,
  choosenItem,
  refetch,
}) => {
  const intl = useIntl();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const validationSchema = Yup.object().shape({
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
    is_active: Yup.boolean().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
    is_trial: Yup.boolean().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
  });
  const initialValues = {
    name: "",
    bitrix_api: "",
    active_at: "",
    stages: "",
    kpi_type: "",
    is_active: false,
    is_trial: false,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await apiClient.put(`/teams/${choosenItem?.id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleConfirmClose();
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

  if (!!choosenItem && !!choosenItem.id) {
    initialValues.name = choosenItem.name;
    initialValues.bitrix_api = choosenItem.bitrix_api;
    initialValues.active_at = moment(choosenItem.active_at).format(
      "YYYY-MM-DD"
    );
    initialValues.is_active = choosenItem.is_active;
    initialValues.is_trial = choosenItem.is_trial;
  }

  const handleOnHide = () => {
    if (formik.dirty) {
      setShowConfirmationModal(true);
    } else {
      handleConfirmClose();
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
        title={intl.formatMessage({ id: "COMMON.EDIT_TEAM" })}
        width={"w-30"}
        onClick={() => formik.handleSubmit()}
      >
        <div className="row">
          <div className="col-md-12 mb-3">
            <ESInput
              label={intl.formatMessage({ id: "COMMON.FULL_NAME" })}
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
              options={KPI_STATUSES}
              value={formik.values.kpi_type}
              onChange={(option) => formik.setFieldValue("kpi_type", option?.value)}
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
