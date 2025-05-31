'use strict';
module.exports = (sequelize, DataTypes) => {
    const Variant = sequelize.define('variant', {
        productId: DataTypes.INTEGER,
        variantName: DataTypes.STRING,
        variantOption: DataTypes.STRING,
        variantCount: DataTypes.INTEGER,
        variantPrice: DataTypes.INTEGER
    }, {});

    Variant.associate = function (models) {
        Variant.belongsTo(models.product, {
            foreignKey: 'productId',
            as: 'products',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Variant;
};
