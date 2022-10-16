const Pool = require("pg").Pool;
const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_DATABASE,
} = require("./utils/config.js");

const pool = new Pool({
	user: DB_USER,
	password: DB_PASSWORD,
	port: 5432,
	host: DB_HOST,
	database: DB_DATABASE,
});

module.exports = pool;
