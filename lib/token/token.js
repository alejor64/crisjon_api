const jwt = require('jsonwebtoken');
const { token_key } = require('../../config');

class Token{
  validateToken(token){
    if(!token){
      return {
        status: 200,
        ok: false
      }
    };
    try {
      const user = jwt.verify(token, token_key);
      return {
        status: 200,
        ok: true,
        user
      }
    } catch (error) {
      return {
        status: 401,
        ok: false
      }
    }
  }
}

module.exports = Token;