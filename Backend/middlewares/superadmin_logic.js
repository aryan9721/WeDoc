const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = function(req, res, next) {
  const username = req.header("username");
  const password = req.header("password");

  try {
    let encodedCred = Buffer.from(`${config.superadmin_username}:${config.superadmin_password}`).toString('base64');
    let super_admin_token  = Buffer.from(`${username}:${password}`).toString('base64');
    if(encodedCred==super_admin_token)next();
    else return res.status(401).send({ message: "Invalid Credentials" });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: "Invalid Credentials" });
  }
};