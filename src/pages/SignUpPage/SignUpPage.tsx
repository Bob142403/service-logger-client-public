import "./SignUpPage.css";
import React, { useCallback } from "react";
import { AutoComplete, Button, Form, Input } from "antd";
import SignUp from "../../types/SignUp";
import useSignUp from "../../hooks/api/auth/use-sign-up";

function SignUpPage() {
  const signUp = useSignUp();
  const onFinish = useCallback(
    async (values: SignUp) => {
      delete values.confirm;
      signUp.mutate(values);
    },
    [signUp]
  );

  return (
    <div className="container">
      <Form name="normal_signUp" className="signUp-form" onFinish={onFinish}>
        <Form.Item
          name="firstName"
          label={"First Name"}
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
        >
          <Input placeholder="Bob" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label={"Last Name"}
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
        >
          <Input placeholder="Mahmudov" />
        </Form.Item>
        <Form.Item
          name="email"
          label={"E-mail"}
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
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <AutoComplete>
            <Input.Password />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <AutoComplete>
            <Input.Password />
          </AutoComplete>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signUp-form-button"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUpPage;
