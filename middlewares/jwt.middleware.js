// This require method is done this way because the documentation for express-jwt says so
const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

function getTokenFromHeaders(req) {
  // req.headers.authorization - > String
  // "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njk2ZGFjYTc0NDE3NmM1MzRjYjFjYTQiLCJ1c2VybmFtZSI6Ilp1YmF0IiwiZW1haWwiOiJ6dWJAdC5jb20iLCJpYXQiOjE3MjEzMjkxMzcsImV4cCI6MTcyMjUzODczN30.ht8Ahz7QHWMlFllMRh4V_zr6IlVM-mV7YcxYyDJV7VQ"

  //check if there's an authorization header AND if it's of type Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  } else {
    return null;
  }
}

module.exports = { isAuthenticated };
