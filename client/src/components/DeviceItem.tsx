import { useHistory } from 'react-router-dom';
import { Col, Card, Image } from 'react-bootstrap';
import star from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({ device }:any) => 
{
    const history = useHistory();

    return (
        <Col md={3} 
            className="mt-4" 
            onClick={ () => history.push(DEVICE_ROUTE + '/' + device.id) }
        >
            <Card style={{ width: 150, cursor: 'pointer' }} border={"light"}>
                <Image 
                    width={150} 
                    height={150} 
                    src={ process.env.REACT_APP_API_URL + device.img } 
                />
                <div className="text-black-50 mt-2 d-flex justify-content-between align-items-center">
                    <div>{ device.name }</div>
                    <div className="d-flex align-items-center">
                        <div className="mr-2">{ device.rating }</div>
                        <Image width={18} height={18} src={ star } />
                    </div>
                </div>
                <div className="mr-2">{ device.name }</div>
            </Card>
        </Col>
    );
}

export default DeviceItem;