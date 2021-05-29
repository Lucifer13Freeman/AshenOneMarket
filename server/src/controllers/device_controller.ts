export {};
const uuid = require('uuid');
const path = require('path');
const fs = require("fs");
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/api_error');

class DeviceController
{
    async create(req:any, res:any, next:any)
    {
        try
        {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;

            let filename = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', '..', 'static', filename));

            const device = await Device.create({ name, price, brandId, typeId, img: filename });

            if (info) 
            {
                info = JSON.parse(info);
                info.forEach((i:any) => DeviceInfo.create({

                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                }));
            }

            return res.json(device);
        }
        catch(e)
        {
            next(ApiError.bad_request(e.message));
        }
    }

    async get(req:any, res:any)
    {
        const { id } = req.params;

        const device = await Device.findOne(
            { 
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            }
        );

        return res.json(device);
    }

    async get_all(req:any, res:any)
    {
        let { brandId, typeId, limit, page } = req.query;

        page = page || 1;
        limit = limit || 9;

        let offset = page * limit - limit;

        let devices;

        if (!brandId && !typeId) devices = await Device.findAndCountAll({ limit, offset })
        if (brandId && !typeId) devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        if (!brandId && typeId) devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        if (brandId && typeId) devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })

        return res.json(devices);
    }

    async delete(req:any, res:any, next:any)
    {
        const { id } = req.params;

        const device = await Device.findOne({ where: { id } });

        let filename = path.resolve(__dirname, '..', '..', 'static', device.img);

        fs.unlink(filename, (e:any) => { if (e) return next(ApiError.internal(e.message)); });

        await device.destroy();

        return res.json({ message: "Device has been deleted!" });
    }
}

module.exports = new DeviceController();