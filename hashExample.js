const bcrypt = require("bcryptjs");

const saltRounds = 10;

const unhashedPassword = "pikachuRocks25";

const salt = bcrypt.genSaltSync(saltRounds);

const hashedPassword = bcrypt.hashSync(unhashedPassword, salt);

console.log(hashedPassword);
