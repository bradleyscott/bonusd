module.exports = {

	jwt: {
		algorithm: 'HS256',
		issuer: 'bonusd',
		audience: 'bonusd',
		expiresIn: 60*60*24, // 1 day,
		// secret: Exists in local and env config files
	}

}