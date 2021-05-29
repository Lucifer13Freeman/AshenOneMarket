export {};
const ApiError = require('../error/api_error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generate_jwt = (id: any, email: any, role: any) => {

    return jwt.sign(
                { id, email, role }, 
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
            );
}

class UserController
{
    async registration(req:any, res:any, next:any)
    {
        const { email, password, role } = req.body;

        if (!email || !password) return next(ApiError.bad_request('Incorrect email or password!'));

        const candidate = await User.findOne({ where: { email } });

        if (candidate) return next(ApiError.bad_request('User with this email is already exists!'));
    
        const hash_password = await bcrypt.hash(password, 10);
        
        const user = await User.create({ email, role, password: hash_password });
        const basket = await Basket.create({ userId: user.id });

        const token = generate_jwt(user.id, user.email, user.role);

        return res.json({ token });
    }

    async login(req:any, res:any, next:any)
    {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) return next(ApiError.internal('User is not found!'));

        let compare_password = bcrypt.compareSync(password, user.password);

        if (!compare_password) return next(ApiError.internal('Incorrect password!'));
    
        const token = generate_jwt(user.id, user.email, user.role);

        return res.json({ token });
    }

    async check_auth(req:any, res:any, next:any)
    {
        const token = generate_jwt(req.user.id, req.user.email, req.user.role);

        return res.json({ token });
    }

    async delete(req: any, res: any)
    {
        const { id } = req.params;

        await User.destroy({ where: { id } });

        return res.json({ message: "User has been deleted!" });
    }
}

module.exports = new UserController();