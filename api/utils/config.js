require("dotenv").config();

module.exports = {
	DB_USER: process.env.DB_USER,
	DB_HOST: process.env.DB_HOST,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_DATABASE: process.env.DB_DATABASE,
	JWTSECRET: process.env.JWTSECRET,
};
