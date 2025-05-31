'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        orderFullName: DataTypes.TEXT,
        orderEmail: DataTypes.STRING,
        orderPhoneNumber: DataTypes.STRING,
        orderAddress: DataTypes.STRING,
        orderCity: DataTypes.STRING,
        orderState: DataTypes.STRING,
        orderZipCode: DataTypes.STRING,
        orderStatus: DataTypes.STRING,
        cartDetail: DataTypes.JSON,
    }, {});

    Order.associate = function (models) {
        // If you add order_items later, associate it here
    };

    return Order;
};
