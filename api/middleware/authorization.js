const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../utils/config.js");

module.exports = async (req, res, next) => {
	try {
		const jwtToken = req.header("token");
		if (!jwtToken) return res.status(403).json("Not Authorize");

		const payload = jwt.verify(jwtToken, JWTSECRET);

		req.user = payload.user;
		next();
	} catch (error) {
		return res.status(403).json(error.message);
	}
};
