import { useContext } from "react";
import { Context } from "..";
import { observer } from 'mobx-react';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => 
{
    const { device } = useContext(Context);
    
    const page_count = Math.ceil(device.total_count / device.limit);
    const pages:any = [];

    for (let i = 0; i < page_count; i++) pages.push(i + 1);

    return (
        <Pagination className="mt-5">
            { pages.map((page:any) => 
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={ () => device.set_page(page) }
                >
                    {page}
                </Pagination.Item>
            ) }
        </Pagination>
    );
});

export default Pages;