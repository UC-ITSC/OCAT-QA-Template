const jwt = require(`jsonwebtoken`);

async function generateAccessToken(user) {
  return await jwt.sign(user.username, user.password);
}

module.exports = generateAccessToken;
