import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

type NotificationType = "success" | "info" | "warning" | "error";

function useNotification() {
  const [api, contextHolder] = notification.useNotification();

  return {
    contextHolder,
    openNotification: (
      type: NotificationType,
      description: string,
      placement: NotificationPlacement = "bottomRight"
    ) => {
      api[type]({
        message: `Notification`,
        description: description,
        placement,
      });
    },
  };
}

export default useNotification;
