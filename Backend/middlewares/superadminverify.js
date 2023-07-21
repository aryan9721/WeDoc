const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = function(req, res, next) {
    // console.log(config);
  const super_admin_token = req.header("super-admin-token");
  if (!super_admin_token) return res.status(401).json({ message: "empty super-admin-token" });

  try {
    console.log(`${config.superadmin_username}:${config.superadmin_password}`);
    let encodedCred = Buffer.from(`${config.superadmin_username}:${config.superadmin_password}`).toString('base64');
    if(encodedCred==super_admin_token)next();
    // return res.status(401).send({ message: "Invalid Token" });
    else return res.status(401).send({ message: "Invalid Token" });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: "Invalid Token" });
  }
};