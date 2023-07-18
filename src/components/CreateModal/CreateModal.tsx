import { Button, Form, Input, Modal } from "antd";
import { useCallback, useState } from "react";
import Service from "../../types/Service";
import useCreateService from "../../hooks/api/service/use-create-service";
import useNotification from "../../hooks/notification/use-notification";

function CreateModal() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contextHolder, openNotification } = useNotification();

  const mutation = useCreateService();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
  }, [form]);

  const onFinish = useCallback(
    async (values: Service) => {
      mutation.mutate(values);
      openNotification("success", "Service Created!");
      handleCancel();
    },
    [handleCancel, mutation, openNotification]
  );

  return (
    <>
      {contextHolder}
      <Button type="dashed" onClick={showModal}>
        Create Service
      </Button>
      <Modal
        title="Create Service"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          name="create_modal"
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="name"
            label="Name"
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
              Create Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateModal;
