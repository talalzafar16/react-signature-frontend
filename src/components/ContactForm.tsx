import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { SERVER_URL } from "@/confidential";
import { API_ENDPOINT } from "@/config/apiEndpoint";

type FieldType = {
  name?: string;
  phone?: string;
  message?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ContactForm = ({ closeModal }: any) => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/mail/enquiryPlot`,
        values
      );

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
        label="Message"
        name="message"
        rules={[{ required: true, message: "Please input your Message!" }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
