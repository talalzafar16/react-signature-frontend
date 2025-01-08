import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { SERVER_URL } from "@/confidential";

type FieldType = {
  name?: string;
  phone?: string;
  block?: string;
  plot?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SaleContactForm = ({ closeModal }: any) => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await axios.post(`${SERVER_URL}mail/salePlot`, values);

      // Handle response from the API
      console.log("Success:", response.data);
      closeModal(false);
      message.success("Your request has been submitted successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        closeModal(false);
        message.error("Failed to submit your request.");
      } else {
        console.error("Unexpected Error:", error);
        closeModal(false);
        message.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please input your Full Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Phone "
        name="phone"
        rules={[{ required: true, message: "Please input your Phone Number!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Block Name"
        name="block"
        rules={[{ required: true, message: "Please input your Block!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Plot Number"
        name="plot"
        rules={[{ required: true, message: "Please input your Plot Number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SaleContactForm;
