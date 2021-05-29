import { useContext } from "react";
import { Context } from "..";
import { observer } from 'mobx-react';
import { Row, Card } from 'react-bootstrap';

const BrandBar = observer(() => 
{
    const { device } = useContext(Context);

    return (
        <Row className="d-flex"> 
            { device.brands.map((brand:any) => 
                <Card
                    key={ brand.id }
                    className="p-3"
                    onClick={ () => device.set_selected_brand(brand) }
                    border={ brand.id === device.selected_brand.id ? 'dark' : 'light' }
                    style={{ cursor: 'pointer' }}
                >
                    { brand.name }
                </Card>
            ) }
        </Row>
    );
});

export default BrandBar;