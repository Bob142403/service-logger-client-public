import { useCallback, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import Service from "../../types/Service";
import "./EditModal.css";
import useUpdateService from "../../hooks/api/service/use-update-service";
import useNotification from "../../hooks/notification/use-notification";

interface Props {
  name: string;
  id: number;
}

function EditModal({ name, id }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contextHolder, openNotification } = useNotification();

  const mutation = useUpdateService(id);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const onFinish = useCallback(
    async (values: Service) => {
      mutation.mutate(values);
      openNotification("info", "Service Updated!");
      handleCancel();
    },
    [handleCancel, mutation, openNotification]
  );

  return (
    <>
      {contextHolder}
      <Button type="dashed" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Service"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form name="edit_modal" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            initialValue={name}
            rules={[
              {
                required: true,
                message: "Please input the Name of Service!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="form_item">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditModal;
