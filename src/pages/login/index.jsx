import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Form, Input, Button, Space, message, Flex } from 'antd';
import useRequest from '../../hooks/useRequest';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { request: loginRequest } = useRequest('/auth/login', {method: 'POST'})
  const handleLogin = async () => {
    const values = await form.validateFields();
    const { email, password } = values;
    const requestBody = { email, password };
    try {
      const data = await loginRequest(requestBody)
      if (data.success) {
        messageApi.success('Login successful!');
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('avatar', data.data.user.avatar);
        localStorage.setItem('fullName', data.data.user.fullName);
        localStorage.setItem('email', data.data.user.email);
        localStorage.setItem('useType', data.data.user.userType);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      } else {
        messageApi.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      messageApi.error('Incorrect email or password.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        console.log(decodedToken)
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      {contextHolder}
      <div className="loginContainer">
        <Flex vertical align='center'>
          <img src="../../../business-meeting.png" alt="Business Meeting" className="loginImage" />
          <Form
            form={form}
            name="loginForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginTop: 50 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
          <Space>
            <Button type='link'
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Button
              type='primary'
              onClick={handleLogin}
            >
              Log in
            </Button>
          </Space>
        </Flex>
      </div>
    </>
  );
};

export default LoginPage;
