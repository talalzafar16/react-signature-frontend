import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type FieldType = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  message?: string;
  email?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ContactForm: React.FC = () => (
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
      label="First Name"
      name="first_name"
      rules={[{ required: true, message: 'Please input your First Name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Last Name"
      name="last_name"
      rules={[{ required: true, message: 'Please input your Last Name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Phone "
      name="phone"
      rules={[{ required: true, message: 'Please input your Phone Number!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Message"
      name="message"
      rules={[{ required: true, message: 'Please input your Message!' }]}
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

export default ContactForm;