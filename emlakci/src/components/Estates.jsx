import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Card, List } from 'antd';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const { Option } = Select;

function Estates() {
    const [filters, setFilters] = useState({
        estateType: null,
        leks: null,
        room: null,
        details: null,
        m2: null,
        state: null,
    });
    const [estates, setEstates] = useState([]);

    useEffect(() => {
        const fetchEstates = async () => {
            const estateCollection = collection(db, 'estates');
            const querySnapshot = await getDocs(estateCollection);
            const estatesData = [];
            querySnapshot.forEach((doc) => {
                estatesData.push({ id: doc.id, ...doc.data() });
            });
            setEstates(estatesData);
        };

        fetchEstates();
    }, []);

    const handleSearch = async () => {
        const estateCollection = collection(db, 'estates');
        let q = query(estateCollection);

        if (filters.estateType) {
            q = query(q, where('estateType', '==', filters.estateType));
        }
        if (filters.leks) {
            q = query(q, where('leks', '==', filters.leks));
        }
        if (filters.room) {
            q = query(q, where('room', '==', filters.room));
        }
        if (filters.details) {
            q = query(q, where('details', '==', filters.details));
        }
        if (filters.m2) {
            q = query(q, where('m2', '==', filters.m2));
        }
        if (filters.state) {
            q = query(q, where('state', '==', filters.state));
        }

        const querySnapshot = await getDocs(q);
        const estatesData = [];
        querySnapshot.forEach((doc) => {
            estatesData.push({ id: doc.id, ...doc.data() });
        });
        setEstates(estatesData);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Card title="Emlak Arama" bordered={false} style={{ maxWidth: 800, margin: 'auto', marginBottom: 50 }}>
                <Form layout="vertical">
                    <Form.Item label="Emlak Tipi">
                        <Select
                            showSearch
                            placeholder="Emlak Tipi Seç"
                            onChange={(value) => { setFilters({ estateType: value, leaks: null, room: null, details: null, m2: null, state: null }) }}
                        >
                            <Option value="Konut">Konut</Option>
                            <Option value="İş yeri">İş yeri</Option>
                            <Option value="Arsa">Arsa</Option>
                        </Select>
                    </Form.Item>
                    {filters.estateType == "Konut" &&
                        <div>
                            <Form.Item label="Kat Sayısı">
                                <Select
                                    showSearch
                                    placeholder="Kat sayısı Gir"
                                    onChange={(value) => setFilters({ ...filters, leks: value })}
                                >
                                    <Option value="Tek kat">Tek kat</Option>
                                    <Option value="Dubleks">Dubleks</Option>
                                    <Option value="Tripleks">Tripleks</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Oda Sayısı">
                                <Select
                                    showSearch
                                    placeholder="Oda sayısı"
                                    onChange={(value) => setFilters({ ...filters, room: value })}
                                >
                                    <Option value="1+0">1+0</Option>
                                    <Option value="2+1">2+1</Option>
                                    <Option value="3+1">3+1</Option>
                                    <Option value="4+1">4+1</Option>
                                </Select>
                            </Form.Item>
                        </div>}


                    {filters.estateType == "İş yeri" &&
                        <div>
                            <Form.Item label="Metrekare">
                                <Select
                                    showSearch
                                    placeholder="Metrekare"
                                    onChange={(value) => setFilters({ ...filters, m2: value })}
                                >
                                    <Option value="50-100">50-100</Option>
                                    <Option value="100-150">100-150</Option>
                                    <Option value="150-200">150-200</Option>
                                    <Option value="200-250">200-250</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Durumu">
                                <Select
                                    showSearch
                                    placeholder="Durumu"
                                    onChange={(value) => setFilters({ ...filters, state: value })}
                                >
                                    <Option value="Satılık">Satılık</Option>
                                    <Option value="Kiralık">Kiralık</Option>
                                </Select>
                            </Form.Item>
                        </div>}

                    <Form.Item>
                        <Button type="primary" onClick={handleSearch} style={{ width: "100%" }}>
                            Ara
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={estates}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.estateType}>
                            {item.leks && <p>Kat Sayısı: {item.leks}</p>}
                            {item.room && <p>Oda Sayısı: {item.room}</p>}
                            {item.m2 && <p>Metrekare: {item.m2}</p>}
                            {item.state && <p>Durumu: {item.state}</p>}
                            {item.details && <p>Açıklama: {item.details}</p>}
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Estates;
