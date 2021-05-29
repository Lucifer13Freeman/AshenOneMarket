import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { create_type } from '../http/deviceAPI';

const CreateType = ({ show, onHide }:any) => 
{
    const [ value, set_value ] = useState('');
    
    const add_type = () => 
    {
        create_type({ name: value }).then(data => set_value(''));
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
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        placeholder={"Введите название типа"} 
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
                    onClick={add_type}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateType;