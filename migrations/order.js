'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            orderFullName: Sequelize.TEXT,
            orderEmail: Sequelize.STRING,
            orderPhoneNumber: Sequelize.STRING,
            orderAddress: Sequelize.STRING,
            orderCity: Sequelize.STRING,
            orderState: Sequelize.STRING,
            orderZipCode: Sequelize.STRING,
            orderStatus: Sequelize.STRING,
            cartDetail: Sequelize.JSON,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('orders');
    }
};
