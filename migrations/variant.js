'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('variants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'products',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            variantName: Sequelize.STRING,
            variantOption: Sequelize.STRING,
            variantCount: Sequelize.INTEGER,
            variantPrice: Sequelize.INTEGER,
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
        await queryInterface.dropTable('variants');
    }
};
