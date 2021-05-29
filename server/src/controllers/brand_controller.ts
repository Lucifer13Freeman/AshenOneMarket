export {};
const { Brand } = require('../models/models');
const ApiError = require('../error/api_error');


class BrandController
{
    async create(req:any, res:any)
    {
        const { name } = req.body;
        const brand = await Brand.create({ name });

        return res.json(brand);
    }

    async get_all(req:any, res:any)
    {
        const brands = await Brand.findAll();

        return res.json(brands);
    }

    async delete(req:any, res:any)
    {
        const { id } = req.params;

        await Brand.destroy({ where: { id } });

        return res.json({ message: "Brand has been deleted!" });
    }
}

module.exports = new BrandController();