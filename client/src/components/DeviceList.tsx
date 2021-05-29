import { useContext } from "react";
import { Context } from "..";
import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => 
{
    const { device } = useContext(Context);

    return (
        <Row className="d-flex"> 
            { device.devices.map((device:any) => 
                <DeviceItem key={ device.id } device={ device } />
            ) }
        </Row>
    );
});

export default DeviceList;