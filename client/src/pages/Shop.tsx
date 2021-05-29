import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import Pages from '../components/Pages';
import { fetch_brands, fetch_devices, fetch_types } from '../http/deviceAPI';

const Shop = observer(() => 
{
    const { device } = useContext(Context);

    useEffect(() => 
    {
        fetch_types().then((data:any) => device.set_types(data));
        fetch_brands().then((data:any) => device.set_brands(data));
        fetch_devices(null, null, 1, device.limit)
            .then((data:any) => 
            {
                device.set_devices(data.rows);
                device.set_total_count(data.count);
            });
    }, []);

    useEffect(() => 
    {
        fetch_devices(device.selected_type.id, device.selected_brand.id, device.page, device.limit)
            .then((data:any) => 
            {
                device.set_devices(data.rows);
                device.set_total_count(data.count);
            });
    }, [device.page, device.selected_type, device.selected_brand]);

    return (
        <Container>
            <Row className="mt-4">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;