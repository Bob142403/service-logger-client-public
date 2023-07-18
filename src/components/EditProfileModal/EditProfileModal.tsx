import { useCallback, useContext } from "react";
import { AutoComplete, Button, Form, Input, Modal } from "antd";
import "./EditProfileModal.css";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/auth/auth-selector";
import { useAuth } from "../../hooks/api/auth/use-auth";
import useUpdateUser from "../../hooks/api/user/use-update-user";
import { ModalOpen } from "../SideBar/SideBar";
import useNotification from "../../hooks/notification/use-notification";

function EditProfileModal() {
  const { isModalOpen, setIsModalOpen } = useContext(ModalOpen);
  const { openNotification } = useNotification();
  const auth = useSelector(getAuth);
  const [form] = Form.useForm();
  const mutation = useAuth();
  const updateUser = useUpdateUser();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);
  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);
  const onFinish = useCallback(
    async (values: any) => {
      delete values.confirm;
      const { firstName, lastName, email, password } = values;

      if (password)
        updateUser.mutate({
          ...values,
          id: auth.id,
        });
      else
        updateUser.mutate({
          firstName,
          lastName,
          email,
          id: auth.id,
        });

      mutation.mutate();
      openNotification("info", "Profile Updated!");

      form.resetFields();

      form.setFieldValue("firstName", firstName);
      form.setFieldValue("lastName", lastName);
      form.setFieldValue("email", email);
      handleCancel();
    },
    [auth.id, form, handleCancel, mutation, updateUser, openNotification]
  );

  return (
    <>
      <span id="editProfileModal" onClick={showModal}></span>
      <Modal
        title="Edit Profile"
        onCancel={handleCancel}
        open={isModalOpen}
        footer={[]}
      >
        <Form
          name="edit_modal"
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            initialValue={auth.firstName}
            rules={[
              {
                required: true,
                message: "Please input Your First Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            initialValue={auth.lastName}
            rules={[
              {
                required: true,
                message: "Please input Your Second Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            initialValue={auth.email}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="password" label="New Password" hasFeedback>
            <AutoComplete children={<Input.Password />} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  let qwe = value;
                  if (!value) qwe = "";
                  if (getFieldValue("password") === qwe) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <AutoComplete children={<Input.Password />} />
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

export default EditProfileModal;
