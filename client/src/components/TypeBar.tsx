import { useContext } from "react";
import { Context } from "..";
import { observer } from 'mobx-react';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => 
{
    const { device } = useContext(Context);

    return (
        <ListGroup>
            { device.types.map((type:any) => 
                <ListGroup.Item 
                    active={ type.id === device.set_selected_type.id }
                    onClick={ () => device.set_selected_type(type) }
                    key={ type.id }
                    variant="light"
                    action
                >
                    { type.name }
                </ListGroup.Item>
            ) }
        </ListGroup>
    );
});

export default TypeBar;