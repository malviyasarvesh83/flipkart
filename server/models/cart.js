const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  detailUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shortTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  longTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mrp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cost: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  discount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  discount1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tagline: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Cart;