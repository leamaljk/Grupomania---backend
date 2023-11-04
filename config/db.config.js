const dotenv = require('dotenv');
dotenv.config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        pool: {
            max:20,
            min: 0,
            acquire: 60000,
            idleTimeoutMillis: 0,
            connectionTimeoutMillis: 0,
        }
    });

    module.exports = sequelize;