import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, theme } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import LoginRegister from './LoginRegister';
import { collection, doc, getDoc } from 'firebase/firestore';
import WelcomePage from './WelcomePage';
import CreateEstate from './CreateEstate';
import Estates from './Estates';
import { Button } from 'antd/es/radio';
import { signOut } from 'firebase/auth';


const { Header, Content, Footer } = Layout;

const items = new Array(0).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));

const MainPage = () => {
    const [user, setUser] = useState(false)
    const [data, setData] = useState()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const history = useNavigate()

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {

                history('/loginregister');
            }
            else {

                const userUID = user.uid
                console.log(userUID)
                const DocRef = doc(db, "users", userUID)
                const getData = await getDoc(DocRef)
                const data = getData.data()
                setData(data)
                setUser(true)

            }
        });



        return () => {
            unsubscribe();
        };
    }, [history]);

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
                {user && (
                    <Button type="primary" onClick={handleSignOut}>Sign Out</Button>
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

                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {user && <Routes>
                        <Route path='/welcome' element={<WelcomePage data={data}></WelcomePage>}></Route>
                        <Route path='/emlakekle' element={<CreateEstate></CreateEstate>}></Route>
                        <Route path='/estatelist' element={<Estates></Estates>}></Route>
                    </Routes>
                    }

                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    flexShrink: 0,
                }}
            >

            </Footer>
        </Layout>
    );
};

export default MainPage;
