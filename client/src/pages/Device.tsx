import { useEffect, useState } from 'react';
import { Container, Col, Row, Card, Button, Image } from 'react-bootstrap';
import big_star from '../assets/big_star.png';
import { useParams } from 'react-router-dom';
import { fetch_device } from '../http/deviceAPI';

const Device = () => 
{
    const [ device, set_device ]:any = useState({ info: []});
    const {id}:any = useParams();

    useEffect(() =>
    {
        fetch_device(id).then(data => set_device(data))
    }, []);

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    <Image 
                        width={300} 
                        height={300} 
                        src={ process.env.REACT_APP_API_URL + device.img } 
                    />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{ device.name }</h2>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ 
                                background: `url(${ big_star }) no-repeat center center`, 
                                width: 120, 
                                height: 120, 
                                backgroundSize: 'cover',
                                fontSize: 52
                            }}
                        >
                            { device.rating }
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column justify-content-around align-items-center"
                        style={{ 
                            width:300, 
                            height:300, 
                            fontSize:32,
                            border: '5px solid lightgray'
                        }}
                    >
                        <h3>От: { device.price } руб.</h3>
                        <Button variant={"outline-dark"}>
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                { device.info.map((info:any) => 
                    <Row key={ info.id } 
                        style={{ 
                            background: info.id % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10,
                        }}
                    >
                        { info.title }: { info.description }
                    </Row>
                ) }
            </Row>
        </Container>
    );
}

export default Device;