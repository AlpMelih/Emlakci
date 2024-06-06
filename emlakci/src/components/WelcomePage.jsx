import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Card, Flex } from 'antd';
import emlaksat from "../assets/emlaksat.jpeg"
import emlakbul from "../assets/emlakbul.jpeg"
import { Divider } from "antd";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;


function WelcomePage(props) {
    const history = useNavigate()


    return (
        <div >
            <div style={{ width: "100%", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "80px" }}>
                <p style={{ fontSize: "40px", fontStyle: "italic" }}>Hoşgeldin {props.data.username}</p>
            </div>
            <Divider style={{ maxWidth: "70%", wordWrap: "break-word", whiteSpace: "normal" }}>
                Emlak sitemize hoşgeldiniz. Emlak sitemize emlak eklemek ve emlaklarınızı diğer kullanıcılar ile paylaşmak için Emlak Sat butonuna,diğer kullanıcıların
                sitemize eklediği emlaklara göz atmak ve sizin için en uygun emlağı bulmak için Emlak Araması Yap butonuna tıklayın.
            </Divider>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Card
                        onClick={() => history("/home/emlakekle")}
                        hoverable
                        style={{ width: 240, textAlign: "center" }}
                        cover={<img alt="example" src={emlaksat} />}
                    >
                        <Meta title="Emlak sat" description="" />

                    </Card>

                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Card
                        onClick={() => { history("/home/estatelist") }}
                        hoverable
                        style={{ width: 240, textAlign: "center" }}
                        cover={<img alt="example" src={emlakbul} />}
                    >
                        <Meta title="Emlak araması yap" description="" />
                    </Card>
                </div>

            </div>

        </div>
    );
}

export default WelcomePage;
