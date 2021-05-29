import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { create_brand } from '../http/deviceAPI';

const CreateBrand = ({ show, onHide }:any) => 
{
    const [ value, set_value ] = useState('');
    
    const add_brand = () => 
    {
        create_brand({ name: value }).then((data:any) => set_value(''));
        onHide();
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
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        placeholder={"Введите название бренда"} 
                        onChange={ (e) => set_value(e.target.value) }
                        value={value}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant={"outline-danger"} 
                    onClick={onHide}
                >
                    Закрыть
                </Button>
                <Button 
                    variant={"outline-success"}
                    onClick={add_brand}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateBrand;