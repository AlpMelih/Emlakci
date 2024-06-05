import React, { useEffect } from 'react';
import { Layout, Menu, Breadcrumb, theme } from 'antd';
import { useNavigate } from 'react-router-dom'; // Importing useHistory from react-router-dom
import { auth } from '../firebase'; // Importing Firebase Auth
import LoginRegister from './LoginRegister'; // Importing LoginRegister page

const { Header, Content, Footer } = Layout;

const items = new Array(5).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));

const MainPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const history = useNavigate()// Using useHistory hook to access the history object

    useEffect(() => {
        // Watching for user authentication state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                // Redirecting to LoginRegister page if user is not authenticated
                history('/loginregister');
            }
        });

        // Cleanup function for useEffect to unsubscribe when component unmounts
        return () => {
            unsubscribe();
        };
    }, [history]); // Dependency array to ensure useEffect runs only when history changes

    return (
        <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                    flex: '1 0 auto',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>MainPage</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    flexShrink: 0,
                }}
            >
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default MainPage;
