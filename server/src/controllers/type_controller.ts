export {};
const { Type } = require('../models/models');
const ApiError = require('../error/api_error');

class TypeController
{
    async create(req:any, res:any)
    {
        const { name } = req.body;
        const type = await Type.create({ name });

        return res.json(type);
    }

    async get_all(req:any, res:any)
    {
        const types = await Type.findAll();

        return res.json(types);
    }

    async delete(req:any, res:any)
    {
        const { id } = req.params;

        await Type.destroy({ where: { id } });

        return res.json({ message: "Type has been deleted!" });
    }
}

module.exports = new TypeController();