import React, { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    Upload,
    message,
    Flex,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { backend_url } from '../../config';

const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

const RegistrationPage = () => {
    const [form] = Form.useForm();
    const [countries, setCountries] = useState([]);
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    const interestsOptions = [
        { label: 'City views', value: 0 },
        { label: 'Natural views', value: 1 },
        { label: 'Historical sites', value: 2 },
        { label: 'Cultural scenes', value: 3 },
        { label: 'Adventure and sports', value: 4 },
    ];

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${backend_url}/api/country`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.success) {
                    setCountries(data.data.countries);
                }
            } catch (error) {
                console.error('获取国家列表失败', error);
            }
        };

        fetchCountries();
    }, []);



    const handleUploadChange = async ({ file, fileList: newFileList }) => {
        setFileList(newFileList);

        // 获取最后一个文件对象，即最新上传的文件
        const latestFile = newFileList[newFileList.length - 1];

        // 检查 latestFile 是否存在，并且具有 originFileObj 属性
        if (latestFile && latestFile.originFileObj) {
            try {
                const base64 = await getBase64(latestFile.originFileObj);
                console.log(base64);
                form.setFieldsValue({ avatar: base64 });
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    // ...其他函数，例如 handleInputChange, handlePreview, handleChange...

    const handleSubmit = async (values) => {
        console.log(values); // 这里会打印出所有表单字段的值
        try {
            const submissionData = { ...values, avatar: 'https://resizing.flixster.com/xkP-QzPdNnU1Q8KQuBB6Q0YCeTU=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/371287_v9_bc.jpg' };
            const response = await fetch(`${backend_url}/api/user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            message.success('Registration successful');
            navigate('/login');// 跳转到登录页面
            // 处理响应
        } catch (error) {
            console.error('error in submitting form', error);
            message.error('Error submitting form');
            // 错误处理
        }
    };


    return (
        <Flex className="formContainer"  justify='center'>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'The password is too weak' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, pattern: /^[a-zA-Z ]{1,50}$/, message: 'Invalid first name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, pattern: /^[a-zA-Z ]{1,50}$/, message: 'Invalid last name' }]}
                >
                    <Input  />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please select a gender' }]}
                >
                    <Radio.Group >
                        <Radio value={0}>Female</Radio>
                        <Radio value={1}>Male</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please select a country' }]}
                >
                    <Select >
                        {countries.map(country => (
                            <Select.Option key={country.id} value={country.id}>{country.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, pattern: /^[a-zA-Z ]{1,200}$/, message: 'Invalid description, description should be 1 to 200 letters' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Avatar" name="avatar" rules={[{required: true, message: 'You should upload your avatar'}]}>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                    >
                        {fileList.length < 1 && <PlusOutlined />}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        { required: true, message: 'Please input your age' },
                        { type: 'number', min: 15, max: 99, message: 'Age must be between 15 and 99' }
                    ]}
                    getValueFromEvent={(event) => {
                        return parseInt(event.target.value, 10); // 转换字符串为数字
                    }}
                >
                    <Input type="number"  />
                </Form.Item>
                <Form.Item 
                label="Interests" 
                name="interest"
                rules={[{ required: true, message: 'Please select at least one interest', type: 'array' }]}
                >
                    <Checkbox.Group options={interestsOptions}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10 }}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default RegistrationPage;
