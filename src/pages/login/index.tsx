import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { encrypt } from 'src/utils';
import { fetchLogin } from '../../api/modules/admin';
const Login: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { username, password } = values;
    const encryptPassword = await encrypt(password.trim());
    const res = await fetchLogin({ name: username, password: encryptPassword });
    if (res.token) {
      localStorage.setItem('token', `Bearer ${ res.token}`);
      localStorage.setItem('userId', String(res.userId));
      navigate('/');
    }
  };
  return (
    <div className="h-screen">
      <Form
        name="normal_login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined/>} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined/>}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
