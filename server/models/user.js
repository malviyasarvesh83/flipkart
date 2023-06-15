const Sequelize = require('sequelize');
const sequelize=require('../utils/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address2: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password2: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = User;