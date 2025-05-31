'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    productTitle: DataTypes.TEXT,
    productFeaturedImageSrc: DataTypes.TEXT,
    productDesciption: DataTypes.TEXT,
  }, {});

  Product.associate = function (models) {
    Product.hasMany(models.variant, {
      foreignKey: 'productId',
      as: 'variants',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Product;
};
