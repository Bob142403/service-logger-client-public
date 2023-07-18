import { Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useCallback, useState } from "react";
import useDeleteService from "../../hooks/api/service/use-delete-service";
import useNotification from "../../hooks/notification/use-notification";

interface Props {
  id: number;
}

function DeleteModal({ id }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contextHolder, openNotification } = useNotification();

  const mutation = useDeleteService();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOk = useCallback(async () => {
    mutation.mutate(id);
    openNotification("warning", "Service Deleted!");
    handleCancel();
  }, [handleCancel, id, mutation, openNotification]);

  return (
    <>
      {contextHolder}
      <Button onClick={showModal} type="dashed">
        Delete
      </Button>
      <Modal
        title={
          <>
            <ExclamationCircleFilled />
            <span> Are you sure delete this Service?</span>
          </>
        }
        open={isModalOpen}
        onOk={handleOk}
        okType="danger"
        okText="Yes"
        cancelText="No"
        closable={false}
        maskClosable={false}
        onCancel={handleCancel}
        width={416}
      ></Modal>
    </>
  );
}

export default DeleteModal;
