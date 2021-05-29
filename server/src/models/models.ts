export {};
const Sequalize = require('../db');
const { DataTypes } = require('sequelize');

const User = Sequalize.define('user', 
{
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    email: {

        type: DataTypes.STRING,
        unique: true
    },
    password: {

        type: DataTypes.STRING
    },
    role: {

        type: DataTypes.STRING,
        defaultValue: "USER"
    }
});

const Basket = Sequalize.define('basket', 
{
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    }
});

const BasketDevice = Sequalize.define('basket_device', 
{
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    }
});

const Device = Sequalize.define('device', 
{
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: {

        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    price: {

        type: DataTypes.FLOAT,
        allowNull: false
    },
    rating: {

        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    img: {

        type: DataTypes.STRING,
    }
});

const Type = Sequalize.define('type', 
{
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: {

        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

const Brand = Sequalize.define('brand', 
{
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: {

        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

const Rating = Sequalize.define('rating', 
{
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    rate: {

        type: DataTypes.FLOAT,
        allowNull: false
    }
});

const DeviceInfo = Sequalize.define('device_info', 
{
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    title: {

        type: DataTypes.STRING,
        allowNull: false
    },
    description: {

        type: DataTypes.STRING,
        allowNull: false
    }
});

const TypeBrand = Sequalize.define('type_brand', 
{
    
    id: {

        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    }
});


User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {

    User, 
    Basket, 
    BasketDevice, 
    Device,
    DeviceInfo,
    Type,
    Brand,
    TypeBrand,
    Rating
}