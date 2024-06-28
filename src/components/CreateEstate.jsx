import React, { useEffect, useState } from 'react';
import { Form, Select, Input, Button, Card, Modal } from 'antd'; // Modal'ı import ettik
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const { Option } = Select;

function CreateEstate(props) {
    const navigate = useNavigate();
    const [estateType, setEstateType] = useState("");
    const [leks, setLeks] = useState("");
    const [room, setRoom] = useState("");
    const [details, setDetails] = useState("");
    const [state, setState] = useState("");
    const [m2, setm2] = useState("");
    const [landType, setLandType] = useState("");
    const [treeAmount, setTreeAmount] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [seller, setSeller] = useState("");
    const [fieldAcre, setFieldAcre] = useState("");
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setSeller(props.data.username);
    }, [props.data.username]);

    const storage = getStorage();

    const onChangeEstate = (value) => {
        setEstateType(value);
        setLeks("");
        setRoom("");
        setDetails("");
        setState("");
        setm2("");
        setLandType("");
        setTreeAmount("");
        setPriceRange("");
        setFieldAcre("");
    };

    const onChangeFieldAcre = (value) => {
        setFieldAcre(value)
    }

    const onChangePriceRange = (value) => setPriceRange(value);

    const onChangeTreeAmount = (value) => setTreeAmount(value);

    const onChangeLandType = (value) => {
        setLandType(value);
        setTreeAmount("");
        setFieldAcre("")
    };

    const onChangeLeks = (value) => setLeks(value);

    const onChangeRoom = (value) => setRoom(value);

    const onChangeState = (value) => setState(value);

    const onChangem2 = (value) => setm2(value);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => { },
                (error) => {
                    console.error("Yükleme hatası: ", error);
                    alert("Görsel yükleme hatası!");
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setImageUrl(downloadURL);
                        resolve(downloadURL);
                        alert("Görsel başarıyla yüklendi!");
                    } catch (error) {
                        console.error("URL alma hatası: ", error);
                        reject(error);
                    }
                }
            );
        });
    };

    const handleSubmit = async () => {
        if ((!estateType) || (!priceRange) || (!details) || (!imageUrl) || (!state)
            || (estateType === "Konut" && (!leks || !room || !details))
            || (estateType === "İş yeri" && (!details || !m2 || !state))
            || (estateType === "Arsa" && (!landType ||
                (landType === "Zeytinlik" && (!treeAmount)) ||
                (landType === "Tarla" && (!fieldAcre)))
            )) {
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
                landType,
                treeAmount,
                priceRange,
                seller,
                fieldAcre,
                imageUrl
            });
            alert("Emlak başarıyla eklendi!");
            setIsModalVisible(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const customFilterOption = (input, option) => option.children.toLowerCase().startsWith(input.toLowerCase());

    const handleOk = () => {
        setIsModalVisible(false);
        navigate("/home/welcome");
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
                        filterOption={customFilterOption}
                    >
                        <Option value="Konut">Konut</Option>
                        <Option value="İş yeri">İş yeri</Option>
                        <Option value="Arsa">Arsa</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Durumu" required>
                    <Select
                        showSearch
                        placeholder="Durumu"
                        optionFilterProp="children"
                        onChange={onChangeState}
                        filterOption={customFilterOption}
                    >
                        <Option value="Satılık">Satılık</Option>
                        <Option value="Kiralık">Kiralık</Option>
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
                                filterOption={customFilterOption}
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
                                filterOption={customFilterOption}
                            >
                                <Option value="1+0">1+0</Option>
                                <Option value="2+1">2+1</Option>
                                <Option value="3+1">3+1</Option>
                                <Option value="4+1">4+1</Option>
                            </Select>
                        </Form.Item>
                    </>
                )}

                {estateType === "İş yeri" && (
                    <>

                        <Form.Item label="Metrekare" required>
                            <Select
                                showSearch
                                placeholder="Metrekare"
                                optionFilterProp="children"
                                onChange={onChangem2}
                                filterOption={customFilterOption}
                            >
                                <Option value="50-100">50-100</Option>
                                <Option value="100-150">100-150</Option>
                                <Option value="150-200">150-200</Option>
                                <Option value="200-250">200-250</Option>
                            </Select>
                        </Form.Item>
                    </>
                )}

                {estateType === "Arsa" && (
                    <>
                        <Form.Item label="Arsa Tipi" required>
                            <Select
                                showSearch
                                placeholder="Arsa Tipi"
                                optionFilterProp="children"
                                onChange={onChangeLandType}
                                filterOption={customFilterOption}
                            >
                                <Option value="Zeytinlik">Zeytinlik</Option>
                                <Option value="Tarla">Tarla</Option>
                            </Select>
                        </Form.Item>
                        {landType === "Zeytinlik" && (
                            <>
                                <Form.Item label="Ağaç Sayısı" required>
                                    <Select
                                        showSearch
                                        placeholder="Ağaç Sayısı"
                                        optionFilterProp='children'
                                        onChange={onChangeTreeAmount}
                                        filterOption={customFilterOption}
                                    >
                                        <Option value="15-30">15-30</Option>
                                        <Option value="30-45">30-45</Option>
                                        <Option value="45-60">45-60</Option>
                                        <Option value="60-75">60-75</Option>
                                        <Option value="75-100">75-100</Option>
                                        <Option value="100-150">100-150</Option>
                                        <Option value="150-300">150-300</Option>
                                        <Option value="300-700">300-700</Option>
                                        <Option value="700-1500">700-1500</Option>
                                        <Option value="1500+">1500+</Option>
                                    </Select>
                                </Form.Item>
                            </>
                        )}
                        {landType === "Tarla" && (
                            <>
                                <Form.Item label="Dönüm Mikarı" required>
                                    <Select
                                        showSearch
                                        placeholder="Dönüm Miktarı"
                                        optionFilterProp='children'
                                        onChange={onChangeFieldAcre}
                                        filterOption={customFilterOption}
                                    >
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                        <Option value="7">7</Option>
                                        <Option value="8">8</Option>
                                        <Option value="9">9</Option>
                                        <Option value="10+">10+</Option>
                                    </Select>
                                </Form.Item>
                            </>
                        )}
                    </>
                )}

                <Form.Item label="Fiyat Aralığı" required>
                    <Select
                        showSearch
                        placeholder="Fiyat Aralığı"
                        optionFilterProp='children'
                        onChange={onChangePriceRange}
                        filterOption={customFilterOption}
                        value={priceRange}
                    >
                        <Option value="0-1000">0-1000</Option>
                        <Option value="1000-5000">1000-5000</Option>
                        <Option value="5000-15000">5000-15000</Option>
                        <Option value="15000-40000">15000-40000</Option>
                        <Option value="40000-85000">40000-85000</Option>
                        <Option value="85000-150000">85000-150000</Option>
                        <Option value="150000-500000">150000-500000</Option>
                        <Option value="500000-1000000">500000-1000000</Option>
                        <Option value="1000000-5000000">1000000-5000000</Option>
                        <Option value="5000000-10000000">5000000-10000000</Option>
                        <Option value="10000000-100000000">10000000-100000000</Option>
                        <Option value="100000000++">100000000++</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Açıklama" required>
                    <Input.TextArea
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Açıklama Yazınız"
                        value={details}
                    />
                </Form.Item>

                <Form.Item label="Görsel Yükle" required>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={async () => {
                        const url = await uploadImage();
                    }} style={{ width: "100%" }}>
                        Resmi Yükle
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={() => {
                        handleSubmit()
                    }} style={{ width: "100%" }}>
                        Emlak Ekle
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title="Başarılı!"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                okText="Tamam"
                cancelText="Kapat"
            >
                <p>Emlak başarıyla eklendi ve e-posta gönderildi!</p>
            </Modal>
        </Card>
    );
}

export default CreateEstate;
