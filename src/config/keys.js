const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

if (!jwtPrivateKey) throw new Error("Invalid private key");

module.exports = `-----BEGIN PRIVATE KEY-----\n${jwtPrivateKey}\n-----END PRIVATE KEY-----`;
