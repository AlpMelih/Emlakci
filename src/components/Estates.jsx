import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Card, List, } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { db } from '../firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

const { Option } = Select;

function Estates(props) {
    const [filters, setFilters] = useState({
        estateType: null,
        leks: null,
        room: null,
        details: null,
        m2: null,
        state: null,
        landType: null,
        treeAmount: null,
        priceRange: null,
        seller: null,
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
        if (filters.landType) {
            q = query(q, where('landType', '==', filters.landType));
        }
        if (filters.treeAmount) {
            q = query(q, where('treeAmount', '==', filters.treeAmount));
        }
        if (filters.priceRange) {
            q = query(q, where('priceRange', '==', filters.priceRange));
        }

        const querySnapshot = await getDocs(q);
        const estatesData = [];
        querySnapshot.forEach((doc) => {
            estatesData.push({ id: doc.id, ...doc.data() });
        });
        setEstates(estatesData);
    };

    const handleDelete = async (id) => {
        try {

            await deleteDoc(doc(db, 'estates', id));

            setEstates(estates.filter(estate => estate.id !== id));
        } catch (error) {
            console.error("Error deleting estate: ", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Card title="Emlak Arama" bordered={false} style={{ maxWidth: 800, margin: 'auto', marginBottom: 50 }}>
                <Form layout="vertical">
                    <Form.Item label="Emlak Tipi">
                        <Select
                            showSearch
                            placeholder="Emlak Tipi Seç"
                            onChange={(value) => { setFilters({ estateType: value, leks: null, room: null, details: null, m2: null, state: null }) }}
                        >
                            <Option value="Konut">Konut</Option>
                            <Option value="İş yeri">İş yeri</Option>
                            <Option value="Arsa">Arsa</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Fiyat Aralığı" required>
                        <Select
                            showSearch
                            placeholder="Fiyat Aralığı"
                            onChange={(value) => setFilters({ ...filters, priceRange: value })}>
                            <Option value="0-1000">0-1000</Option>
                            <Option value="1000-5000">1000-5000</Option>
                            <Option value="5000-15000">5000-15000</Option>
                            <Option value="15000-40000">15000-40000</Option>
                            <Option value="40000-850000">40000-85000</Option>
                            <Option value="85000-150000">85000-150000</Option>
                            <Option value="150000-500000">150000-500000</Option>
                            <Option value="500000-1000000">500000-1000000</Option>
                            <Option value="1000000-5000000">1000000-5000000</Option>
                            <Option value="5000000-10000000">5000000-10000000</Option>
                            <Option value="10000000-100000000">10000000-100000000</Option>
                            <Option value="100000000++">100000000++</Option>
                        </Select>
                    </Form.Item>
                    {filters.estateType === "Konut" &&
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

                    {filters.estateType === "İş yeri" &&
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

                            {props.data.username === item.seller && (
                                <DeleteOutlined
                                    onClick={() => handleDelete(item.id)}
                                    style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                />
                            )}
                            {item.leks && <p>Kat Sayısı: {item.leks}</p>}
                            {item.room && <p>Oda Sayısı: {item.room}</p>}
                            {item.m2 && <p>Metrekare: {item.m2}</p>}
                            {item.state && <p>Durumu: {item.state}</p>}
                            {item.landType && <p>Arsa Türü: {item.landType}</p>}
                            {item.treeAmount && <p>Ağaç Sayısı: {item.treeAmount}</p>}
                            {item.priceRange && <p>Fiyat Aralığı: {item.priceRange}</p>}
                            {item.details && <p>Açıklama: {item.details}</p>}
                            {item.seller && <p>Satıcı: {item.seller}</p>}
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Estates;
