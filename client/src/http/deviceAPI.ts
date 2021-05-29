import { $auth_host, $host } from './index';

export const create_type = async (type:any) =>
{
    const { data } = await $auth_host.post('api/type', type);
    return data;
}

export const fetch_types = async () =>
{
    const { data } = await $host.get('api/type');
    return data;
}

export const create_brand = async (brand:any) =>
{
    const { data } = await $auth_host.post('api/brand', brand);
    return data;
}

export const fetch_brands = async () =>
{
    const { data } = await $host.get('api/brand');
    return data;
}

export const create_device = async (device:any) =>
{
    const { data } = await $auth_host.post('api/device', device);
    return data;
}

export const fetch_devices = async (typeId:any, brandId:any, page:any, limit:any = 5) =>
{
    const { data } = await $host.get('api/device', {params: 
    {
        typeId, brandId, page, limit
    }});
    return data;
}

export const fetch_device = async (id:any) =>
{
    const { data } = await $host.get('api/device/' + id);
    return data;
}