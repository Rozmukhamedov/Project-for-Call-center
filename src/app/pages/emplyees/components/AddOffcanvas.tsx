import { useState } from "react";
import * as Yup from "yup";
import { FC } from "react";
import { useFormik } from "formik";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import apiClient from "../../../../_metronic/hook/apiClient";
import { ESInputPhone } from "../../../components/input-phone";
import {
  ESInput,
  ESOffcanvas,
  ESConfirmationModal,
  ESInputSelect,
} from "../../../components";
import {
  ApiError,
  notifyError,
} from "../../../../_metronic/helpers/notifyError";

type OptionType = {
  value: null | number;
  label: string;
};

type AddOffcanvasPropsType = {
  teams: OptionType[];
  show: boolean;
  onHide: () => void;
  refetch: () => void;
};

export const AddOffcanvas: FC<AddOffcanvasPropsType> = ({
  show,
  onHide,
  refetch,
  teams,
}) => {
  const intl = useIntl();

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    avatar: Yup.string(),
    full_name: Yup.string().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
    team_id: Yup.number().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
    email: Yup.string()
      .nullable()
      .trim()
      .lowercase()
      .email(intl.formatMessage({ id: "VALIDATION.EMAIL" })),

    count_of_plan: Yup.number().required(
      intl.formatMessage({ id: "VALIDATION.REQUIRED" })
    ),
    phone: Yup.string()
      .nullable()
      .matches(/^998\d{9}$/, intl.formatMessage({ id: "VALIDATION.PHONE" })),
  });

  const initialValues = {
    full_name: "",
    team_id: null,
    avatar: "",
    phone: "",
    email: "",
    count_of_plan: 0,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append("avatar", values.avatar);
      formData.append("full_name", values.full_name);
      formData.append("team_id", values.team_id || "");
      formData.append("email", values.email);
      formData.append("count_of_plan", (values.count_of_plan || 0).toString());
      formData.append("phone", values.phone);

      try {
        await apiClient.post("/employees", values, {
          headers: {
            "Content-Type": "multipart/form-data",
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
        title={intl.formatMessage({ id: "COMMON.CREATE_EMPLOYEE" })}
        width={"w-25"}
        onClick={() => formik.handleSubmit()}
      >
        <div className="row">
          <div className="col-12 mb-3">
            <ESInput
              type="file"
              label={intl.formatMessage({ id: "COMMON.AVATAR" })}
              accept="image/*" // Ограничение выбора файлов только изображениями
              onChange={(event) => {
                const file = event.target?.files?.[0];
                if (file) {
                  const maxSize = 5 * 1024 * 1024; // 5MB в байтах

                  // Проверяем, является ли файл изображением
                  if (!file.type.startsWith("image/")) {
                    formik.setFieldError(
                      "avatar",
                      intl.formatMessage({ id: "ERROR.INVALID_FILE_TYPE" })
                    );
                    return;
                  }

                  // Проверяем размер файла
                  if (file.size > maxSize) {
                    formik.setFieldError(
                      "avatar",
                      intl.formatMessage({ id: "ERROR.FILE_SIZE" })
                    );
                    return;
                  }
                  formik.setFieldValue("avatar", file);
                }
              }}
              required
              touched={formik.touched.avatar}
              errors={formik.errors.avatar}
            />
          </div>
          <div className="col-12 mb-3">
            <ESInput
              label={intl.formatMessage({ id: "COMMON.FULL_NAME" })}
              {...formik.getFieldProps("full_name")}
              touched={formik.touched.full_name}
              errors={formik.errors.full_name}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <ESInput
              type="email"
              label={intl.formatMessage({ id: "COMMON.EMAIL" })}
              {...formik.getFieldProps("email")}
              touched={formik.touched.email}
              errors={formik.errors.email}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <ESInputPhone
              label={intl.formatMessage({
                id: "COMMON.PHONE",
              })}
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              touched={formik.touched.phone}
              errors={formik.errors.phone}
              country="uz"
              placeholder="+998 (94) 650-07-32"
            />
          </div>
          <div className="col-12 mb-3">
            <ESInput
              label={intl.formatMessage({ id: "COMMON.COUNT_OF_PLAN" })}
              {...formik.getFieldProps("count_of_plan")}
              touched={formik.touched.count_of_plan}
              errors={formik.errors.count_of_plan}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <ESInputSelect
              label={intl.formatMessage({
                id: "COMMON.TEAM",
              })}
              options={teams}
              value={formik.values.team_id}
              onChange={(option) =>
                formik.setFieldValue("team_id", option?.value)
              }
              touched={formik.touched.team_id}
              errors={formik.errors.team_id}
              required
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
