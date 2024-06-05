import React from 'react';
import { Tabs, Form, Input, Button, Checkbox, Layout, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const LoginForm = () => {
    const onFinish = (values) => {
        console.log('Login values: ', values);
    };

    return (
        <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

const RegisterForm = () => {
    const onFinish = (values) => {
        console.log('Register values: ', values);
    };

    return (
        <Form
            name="register_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

const LoginRegister = () => {
    return (
        <Layout style={{ minHeight: '100vh', minWidth: "100vw" }}>
            <Header
                style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: '24px',
                }}
            >
                Login / Register
            </Header>
            <Content style={{ padding: '50px' }}>
                <Card style={{ maxWidth: '400px', margin: 'auto' }}>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Login" key="1">
                            <LoginForm />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Register" key="2">
                            <RegisterForm />
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </Content>
        </Layout>
    );
};

export default LoginRegister;
