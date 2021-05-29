import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { Context } from '..';
import { fetch_types, fetch_brands, create_device } from '../http/deviceAPI';

const CreateDevice = observer(({ show, onHide }:any) => 
{
    const { device } = useContext(Context); 

    const [ name, set_name ] = useState('');
    const [ price, set_price ] = useState(0);
    const [ file, set_file ]:any = useState(null);
    const [ info, set_info ]:any = useState([]);

    useEffect(() => 
    {
        fetch_types().then((data:any) => device.set_types(data));
        fetch_brands().then((data:any) => device.set_brands(data));
    }, []);

    const add_info = () =>
    {
        set_info([ ...info, { title: '', description: '', number: Date.now() }]);
    }

    const remove_info = (number:any) =>
    {
        set_info(info.filter( (i:any) => i.number !== number ));
    }

    const change_info = (key:any, value:any, number:any) =>
    {
        set_info(info.map((i:any) => i.number === number ? { ...i, [key]: value } : i));
    }

    const select_file = (e:any) => 
    {
        set_file(e.target.files[0]);
    }

    const add_device = () =>
    {
        const form_data = new FormData();

        form_data.append('name', name);
        form_data.append('price', `${price}`);
        form_data.append('img', file);
        form_data.append('typeId', device.selected_type.id);
        form_data.append('brandId', device.selected_brand.id);
        form_data.append('info', JSON.stringify(info));

        create_device(form_data).then((data:any) => onHide());
    }

    return (

        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        value={name}
                        onChange={ e => set_name(e.target.value) }
                        className="mt-3"
                        placeholder={"Введите название устройства"} 
                    />
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle variant={"outline-dark"} >
                            { device.selected_type.name || "Выбрать тип" }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            { device.types.map((type:any) => 
                                <Dropdown.Item 
                                    key={type.id}
                                    onClick={ () => device.set_selected_type(type) }
                                >
                                    { type.name }
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle variant={"outline-dark"} >
                            { device.selected_brand.name || "Выбрать бренд" }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            { device.brands.map((brand:any) => 
                                <Dropdown.Item 
                                    key={brand.id}
                                    onClick={ () => device.set_selected_brand(brand) }
                                >
                                    { brand.name }
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control 
                        value={price}
                        onChange={ e => set_price(Number(e.target.value)) }
                        className="mt-3"
                        placeholder={"Введите стоимость устройства"} 
                        type="number"
                    />
                    <Form.Control 
                        className="mt-3"
                        type="file"
                        onChange={ select_file }
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={add_info}
                    >
                        Добавить характеристику
                    </Button>
                    {
                        info.map((i:any) => 
                            <Row className="mt-3" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={ (e) => change_info('title', e.target.value, i.number) }
                                        placeholder={"Введите название характеристики"}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control 
                                        value={i.description}
                                        onChange={ (e) => change_info('description', e.target.value, i.number) }
                                        placeholder={"Введите описание характеристики"}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button 
                                        variant={"outline-danger"} 
                                        onClick={ () => remove_info(i.number) }
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant={"outline-danger"} 
                    onClick={ onHide }
                >
                    Закрыть
                </Button>
                <Button 
                    variant={"outline-success"}
                    onClick={ add_device }
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;