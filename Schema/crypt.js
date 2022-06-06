var bcrypt = require("bcryptjs");

function encrypt(pwd) {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pwd, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
}

function decrypt(pwd, dbpwd) {
  try {
    return bcrypt.compareSync(pwd, dbpwd);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { encrypt, decrypt };
