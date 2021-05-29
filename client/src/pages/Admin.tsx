import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import CreateType from '../modals/CreateType';
import CreateBrand from '../modals/CreateBrand';
import CreateDevice from '../modals/CreateDevice';


const Admin = () => 
{
    const [ brand_visible, set_brand_visible ] = useState(false);
    const [ type_visible, set_type_visible ] = useState(false);
    const [ device_visible, set_device_visible ] = useState(false);
    
    return (

        <Container className="d-flex flex-column mt-5">
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-2"
                onClick={ () => set_type_visible(true) }
            >
                Добавить тип
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-2"
                onClick={ () => set_brand_visible(true) }
            >
                Добавить бренд
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-3 p-2"
                onClick={ () => set_device_visible(true) }
            >
                Добавить устройство
            </Button>
            <CreateBrand 
                show={brand_visible} 
                onHide={ () => set_brand_visible(false) }
            />
            <CreateType 
                show={type_visible} 
                onHide={ () => set_type_visible(false) }
            />
            <CreateDevice 
                show={device_visible} 
                onHide={ () => set_device_visible(false) }
            />
        </Container>
    );
}

export default Admin;