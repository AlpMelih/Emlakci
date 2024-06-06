import React, { useState } from 'react';
import { Form, Select, Input, Button, Row, Col, Card } from 'antd';
import { db } from '../firebase'; // Firebase yapılandırma dosyasını import edin
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function CreateEstate() {
    const navigate = useNavigate();
    const [estateType, setEstateType] = useState("");
    const [leks, setLeks] = useState("");
    const [room, setRoom] = useState("");
    const [details, setDetails] = useState("");
    const [state, setState] = useState("");
    const [m2, setm2] = useState("");

    const onChangeEstate = (value) => {
        setEstateType(value);
        setLeks("")
        setRoom("")
        setDetails("")
        setState("")
        setm2("")
    };
    const onChangeLeks = (value) => {
        setLeks(value);
    };
    const onChangeRoom = (value) => {
        setRoom(value);
    };
    const onChangeState = (value) => {
        setState(value);
    };
    const onChangem2 = (value) => {
        setm2(value);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const handleSubmit = async () => {
        if ((!estateType) || (estateType == "Konut" && (!leks || !room || !details)) || (estateType == "İş yeri" && (!details || !m2 || !state))) {

            alert("Lütfen tüm alanları doldurun.");
            return;
        }


        try {
            await addDoc(collection(db, "estates"), {
                estateType,
                leks,
                room,
                details,
                m2,
                state,
            });
            alert("Emlak başarıyla eklendi!");
            navigate("/home/welcome");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <Card title="Emlak Ekle" bordered={false} style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}>
            <Form layout="vertical">
                <Form.Item label="Emlak Tipi" required>
                    <Select
                        showSearch
                        placeholder="Emlak Tipi Seç"
                        optionFilterProp="children"
                        onChange={onChangeEstate}
                        onSearch={onSearch}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    >
                        <Option value="Konut">Konut</Option>
                        <Option value="İş yeri">İş yeri</Option>
                        <Option value="Arsa">Arsa</Option>
                    </Select>
                </Form.Item>

                {estateType === "Konut" && (
                    <>
                        <Form.Item label="Kat Sayısı" required>
                            <Select
                                showSearch
                                placeholder="Kat sayısı Gir"
                                optionFilterProp="children"
                                onChange={onChangeLeks}
                                onSearch={onSearch}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            >
                                <Option value="Tek kat">Tek kat</Option>
                                <Option value="Dubleks">Dubleks</Option>
                                <Option value="Tripleks">Tripleks</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Oda Sayısı" required>
                            <Select
                                showSearch
                                placeholder="Oda sayısı"
                                optionFilterProp="children"
                                onChange={onChangeRoom}
                                onSearch={onSearch}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            >
                                <Option value="1+0">1+0</Option>
                                <Option value="2+1">2+1</Option>
                                <Option value="3+1">3+1</Option>
                                <Option value="4+1">4+1</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Açıklama" required>
                            <Input.TextArea
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder="Açıklama Yazınız"
                                value={details}
                            />
                        </Form.Item>
                    </>
                )}

                {estateType === "İş yeri" && (
                    <>
                        <Form.Item label="Durumu" required>
                            <Select
                                showSearch
                                placeholder="Durumu"
                                optionFilterProp="children"
                                onChange={onChangeState}
                                onSearch={onSearch}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            >
                                <Option value="Satılık">Satılık</Option>
                                <Option value="Kiralık">Kiralık</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Metrekare" required>
                            <Select
                                showSearch
                                placeholder="Metrekare"
                                optionFilterProp="children"
                                onChange={onChangem2}
                                onSearch={onSearch}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            >
                                <Option value="50-100">50-100</Option>
                                <Option value="100-150">100-150</Option>
                                <Option value="150-200">150-200</Option>
                                <Option value="200-250">200-250</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Açıklama" required>
                            <Input.TextArea
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder="Açıklama Yazınız"
                                value={details}
                            />
                        </Form.Item>
                    </>
                )}

                <Form.Item>
                    <Button type="primary" onClick={handleSubmit} style={{ width: "100%" }}>
                        Emlak Ekle
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default CreateEstate;
