const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization.js");

router.get("/", authorization, async (req, res) => {
	try {
		const user = await pool.query(
			"SELECT user_name FROM users WHERE user_id = $1",
			[req.user]
		);
		res.send(user.rows[0]);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
