import clsx from "clsx";
import { useLayout } from "../../core";
import { WithChildren } from "../../../helpers";

const Content = ({ children }: WithChildren) => {
  const { config, classes } = useLayout();

  return (
    <div
      id="kt_app_content"
      className={clsx(
        "app-content flex-column-fluid",
        classes.content.join(" "),
        config?.app?.content?.class
      )}
    >
      <div
        id="kt_app_content_container"
        className={clsx(
          "app-container container-fluid",
          classes.contentContainer.join(" ")
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { Content };
