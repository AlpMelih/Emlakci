import React, { useState } from 'react';
import { Tabs, Form, Input, Button, Checkbox, Layout, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { auth, db } from '../firebase'; // Firebase Auth ve Firestore örneği
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const { Header, Content } = Layout;

const LoginRegister = () => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');

    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);

    const handleLoginSubmit = async () => {
        try {
            setLoginLoading(true);
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            message.success('Login successful!');
            setLoginLoading(false);
            navigate("/home/welcome");
        } catch (error) {
            console.error('Login error:', error);
            message.error('Login failed. Please try again.');
            setLoginLoading(false);
        }
    };

    const handleRegisterSubmit = async () => {
        try {
            setRegisterLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const user = userCredential.user;

            // Firestore'da kullanıcı dokümanı oluşturma
            await setDoc(doc(db, 'users', user.uid), {
                username: registerUsername,
                email: registerEmail
            });

            message.success('Registration successful!');
            setRegisterLoading(false);
        } catch (error) {
            console.error('Registration error:', error);
            message.error(error.message);
            setRegisterLoading(false);
        }
    };

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
                            <Form
                                name="login_form"
                                onFinish={handleLoginSubmit}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your Email!' }]}
                                >
                                    <Input
                                        prefix={<MailOutlined />}
                                        placeholder="Email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
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
                                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loginLoading}>
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Register" key="2">
                            <Form
                                name="register_form"
                                onFinish={handleRegisterSubmit}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your Email!' }]}
                                >
                                    <Input
                                        prefix={<MailOutlined />}
                                        placeholder="Email"
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Username"
                                        value={registerUsername}
                                        onChange={(e) => setRegisterUsername(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="Password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="register-form-button" loading={registerLoading}>
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </Content>
        </Layout>
    );
};

export default LoginRegister;
