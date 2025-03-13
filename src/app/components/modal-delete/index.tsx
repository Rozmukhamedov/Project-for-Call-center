import * as Yup from "yup";
import { useFormik } from "formik";
import { FC, ReactNode } from "react";
import { KTSVG } from "../../../_metronic/helpers";
import { Modal, ModalProps } from "react-bootstrap";
import { useIntl } from "react-intl";
// import { toast } from "react-toastify";
import { ESButton } from "../button";
import apiClient from "../../../_metronic/hook/apiClient";

export interface ESModalDeleteProps extends ModalProps {
  header?: ReactNode; // Заголовок модального окна
  footer?: ReactNode; // Футер модального окна
  deleteBtn?: boolean; // Флаг отображения кнопки удаления
  text?: string; // Текст предупреждения
  url: string; // URL для API
  image?: string; // Путь к изображению
  onHide: () => void; // Функция закрытия модального окна
  size?: "sm" | "lg" | "xl"; // Размер модального окна
  setEditOffcanvasShow: () => void;
  refetch: () => void;
}

const ESModalDelete: FC<ESModalDeleteProps> = ({
  show,
  onHide,
  header = true,
  footer = true,
  dialogClassName = "",
  size,
  text,
  url,
  image,
  setEditOffcanvasShow,
  refetch,
}) => {
  const intl = useIntl();

  // Создаем валидацию (в данном случае пустую)
  const validationSchema = Yup.object().shape({});

  // Начальные значения формы
  const initialValues = {};

  // Обработчик формы
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (_, { resetForm, setSubmitting }) => {
      setSubmitting(true);

      try {
        await apiClient.delete(`${url}`);
        resetForm();
        setEditOffcanvasShow();
        onHide();
        refetch();
        // toast.success(intl.formatMessage({ id: "NOTIFICATION.DELETED" }));
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      show={show}
      onHide={onHide}
      tabIndex={-1}
      dialogClassName={dialogClassName}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* Заголовок модального окна */}
      {header && (
        <Modal.Header className="d-flex justify-content-between">
          <h5 className="modal-title">
            {intl.formatMessage({ id: "COMMON.DELETE_CONFIRMATION" })}
          </h5>
          <button
            type="button"
            className="btn btn-icon btn-sm btn-active-light-primary ms-2"
            onClick={onHide}
          >
            <KTSVG
              path="media/icons/duotune/arrows/arr061.svg"
              className="svg-icon svg-icon-2x"
            />
          </button>
        </Modal.Header>
      )}

      {/* Тело модального окна */}
      <Modal.Body className="text-center">
        {image && (
          <img
            className="mb-3"
            src={image}
            alt="Delete item"
            width={100}
            height={100}
          />
        )}
        <h3>{intl.formatMessage({ id: "COMMON.WANT_DELETE" }, { text })}</h3>
      </Modal.Body>

      {/* Футер модального окна */}
      {footer && (
        <Modal.Footer>
          <ESButton
            type="button"
            className="btn btn-light btn-sm"
            onClick={onHide}
          >
            {intl.formatMessage({ id: "COMMON.CANCEL" })}
          </ESButton>
          <ESButton
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
          >
            {intl.formatMessage({ id: "COMMON.DELETE" })}
          </ESButton>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export { ESModalDelete };
