import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, theme, Button } from 'antd'; // Import Button from 'antd'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import LoginRegister from './LoginRegister';
import { doc, getDoc } from 'firebase/firestore';
import WelcomePage from './WelcomePage';
import CreateEstate from './CreateEstate';
import Estates from './Estates';
import { signOut } from 'firebase/auth';

const { Header, Content, Footer } = Layout;

// Define meaningful menu items with keys and labels
const menuItems = [

];

const MainPage = () => {
    const [user, setUser] = useState(false);
    const [data, setData] = useState();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/loginregister');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/loginregister');
            } else {
                const userUID = user.uid;
                console.log(userUID);
                const DocRef = doc(db, "users", userUID);
                const getData = await getDoc(DocRef);
                const data = getData.data();
                setData(data);
                setUser(true);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);

    // Handle menu item click
    const handleMenuClick = (e) => {
        const selectedItem = menuItems.find(item => item.key === e.key);
        if (selectedItem) {
            navigate(selectedItem.path);
        }
    };

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
                    defaultSelectedKeys={['1']}
                    items={menuItems.map(item => ({ key: item.key, label: item.label }))}
                    onClick={handleMenuClick}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
                {user && (
                    <>
                        <Button type="primary" onClick={() => navigate(-1)}>Back</Button> {/* Back button */}
                        <Button type="primary" onClick={handleSignOut} style={{ marginLeft: 8 }}>Sign Out</Button>
                    </>
                )}
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
                    {/* Breadcrumbs can be dynamically added here */}
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {user && (
                        <Routes>
                            <Route path='/welcome' element={<WelcomePage data={data} />} />
                            <Route path='/emlakekle' element={<CreateEstate data={data} />} />
                            <Route path='/estatelist' element={<Estates data={data} />} />
                        </Routes>
                    )}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    flexShrink: 0,
                }}
            >
                Real Estate Management System ©2024
            </Footer>
        </Layout>
    );
};

export default MainPage;
