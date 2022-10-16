const router = require("express").Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const validInfo = require("../middleware/validInfo.js");
const authorization = require("../middleware/authorization.js");

router.post("/register", validInfo, async (req, res) => {
	try {
		// 1. destructure the req.body (name,email,pw)
		const { name, email, password } = req.body;
		if (!name || !email || !password)
			throw new Error("Complete all input please");
		// 2. check if the user exist (if user exist then throw err)
		const user = await pool.query(
			"SELECT * FROM users WHERE user_email = $1",
			[email]
		);
		if (user.rows.length)
			return res.status(401).send("User already exists");

		// 3. bcrypt the user the pw
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const bcryptPassword = await bcrypt.hash(password, salt);

		// 4. enter the new user inside out database
		const newUser = await pool.query(
			"INSERT INTO users (user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *",
			[name, email, bcryptPassword]
		);
		// 5. generate our jwt token
		const token = jwtGenerator(newUser.rows[0].user_id);
		res.json({ token });
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.post("/login", validInfo, async (req, res) => {
	try {
		// 1. destructure the req.body
		const { email, password } = req.body;
		// 2. check if user doesn't exist (if exist then we throw err)
		const user = await pool.query(
			"SELECT * FROM users WHERE user_email = $1",
			[email]
		);
		if (!user.rows.length)
			return res.status(401).json("Password or Email is incorrect");
		// 3. check if incoming password is the same as the database password
		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].user_password
		);
		// 4. give them the jwt token
		const token = jwtGenerator(user.rows[0].user_id);
		res.json({ token });
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get("/is-verify", authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
