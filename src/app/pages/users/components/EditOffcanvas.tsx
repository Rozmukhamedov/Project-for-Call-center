import * as Yup from "yup";
import { FC, useState } from "react";
import { useFormik } from "formik";
import { useIntl } from "react-intl";
import { ESConfirmationModal, ESInput, ESOffcanvas } from "../../../components";
import apiClient from "../../../../_metronic/hook/apiClient";
import { UserType } from "..";
import { toast } from "react-toastify";
import {
  ApiError,
  notifyError,
} from "../../../../_metronic/helpers/notifyError";
import { ESInputPhone } from "../../../components/input-phone";

type EditOffcanvasPropsType = {
  show: boolean;
  onHide: () => void;
  choosenItem: UserType | null;
  setShowDeleteModal: () => void;
  refetch: () => void;
};

type initialValuesType = {
  password: string;
  name: string | null;
  phone: string;
  email: string;
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
    name: Yup.string()
      .min(
        3,
        intl.formatMessage({ id: "VALIDATION.MAX_SYMBOLS" }, { count: 3 })
      )
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRED" })),
    email: Yup.string()
      .trim()
      .lowercase()
      .email(intl.formatMessage({ id: "VALIDATION.EMAIL" }))
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRED" })),
    password: Yup.string()
      .min(
        8,
        intl.formatMessage({ id: "VALIDATION.MAX_SYMBOLS" }, { count: 8 })
      )
      .max(
        20,
        intl.formatMessage({ id: "VALIDATION.MAX_SYMBOLS" }, { count: 20 })
      )
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRED" })),
    phone: Yup.string()
      .matches(/^998\d{9}$/, intl.formatMessage({ id: "VALIDATION.PHONE" }))
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRED" })),
  });

  const initialValues: initialValuesType = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await apiClient.put(`/users/${choosenItem?.id}`, values, {
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
    initialValues.email = choosenItem.email;
    initialValues.password = choosenItem.password;
    initialValues.phone = choosenItem.phone.replace("+", "");
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
        title={intl.formatMessage({ id: "COMMON.EDIT_USER" })}
        width={"w-30"}
        onClick={() => formik.handleSubmit()}
      >
        <div className="row">
          <div className="col-12 mb-3">
            <ESInput
              label={intl.formatMessage({ id: "COMMON.FULL_NAME" })}
              {...formik.getFieldProps("name")}
              touched={formik.touched.name}
              errors={formik.errors.name}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <ESInput
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
              label={intl.formatMessage({ id: "COMMON.PASSWORD" })}
              {...formik.getFieldProps("password")}
              touched={formik.touched.password}
              errors={formik.errors.password}
              minLength={8}
              maxLength={20}
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
