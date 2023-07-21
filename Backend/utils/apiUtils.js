const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const logger = require("../utils/logger");
const globalConstant = require("../utils/globalConstant");
const otp_generator = require("otp-generator");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const errorMessages = require("../utils/errorMessages");
const { readPublicPEMFile } = require("./secretKeyUtil");
const sendOTP = require('../routes/sendMSG');
// const sendEmail = require('../routes/emailSender');
const sendEmail = require('../routes/emailSender');

exports.getError = (message, statusCode) => {
  return {
    statusCode,
    message,
  };
};

exports.getResponse = (msg, statusCode) => {
  return {
    msg,
    statusCode,
  };
};

/**
 * This function will generate the token for dev, test and prod environments
 * @param {*} data
 */
exports.generateToken = (data, expiryTime, privateCert, passPhrase) => {
  logger.debug("Inside generateToken");
  let jwtExpiryTime = expiryTime
    ? expiryTime
    : globalConstant.DEFAULT_JWT_EXPIRY_TIME;
  let token = jwt.sign(
    data,
    {
      key: privateCert,
      passphrase: passPhrase,
    },
    {
      algorithm: "RS256",
      expiresIn: jwtExpiryTime, // if no data found in application data, default expiration time is 72 hours
    }
  );
  logger.debug("jwt generated successfully");
  return token;
};

exports.generateOtp = () => {
  return "234234";
};

exports.verifyToken = (token, secretKey) => {
  logger.debug("verify token function");
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        let errorResponse = new ErrorResponse(
          errorMessages.TOKEN_NOT_VERIFY,
          400
        );
        reject(errorResponse.getErrorResponse());
      } else {
        resolve(decoded);
      }
    });
  });
};
function isEmail(str) {
  // Regular expression to check for the "@" symbol in the string
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(str);
}

exports.generateHash = (phoneNumber) => {
  logger.debug(`inside generate hash for otp system`);
  const otp = this.generateOtp(),expires = Date.now() + globalConstant.OTP_TTL;
  logger.debug(`otp generated: ${otp}`);// we will send it to any third party
  const content = `${phoneNumber}.${otp},${expires}`;
  if(isEmail(phoneNumber))
  {
    const receiverEmail = 'aryanvora68@gmail.com'; // Replace with the receiver's email address
    const subject = 'Wedoc Login OTP';
    const text = 'Your wedoc login otp is '+otp;
    
    sendEmail(phoneNumber, subject, text);
  }
  else
  {
    // Now you can use the `sendOTP` function in this file
    const mobileNumber = phoneNumber;
    const message = otp+` is OTP for login.  -  Parking-Clip.com, a service by Docuclip P Ltd.`;

    sendOTP(mobileNumber, message);
  }

  const hash = crypto
    .createHmac("sha256", readPublicPEMFile)
    .update(content)
    .digest("hex");
  return `${hash}.${expires}`;
};

exports.generateHashByOTP = (phoneNumber, otp, expires) => {
  const content = `${phoneNumber}.${otp},${expires}`;
  const hash = crypto
    .createHmac("sha256", readPublicPEMFile)
    .update(content)
    .digest("hex");
  return `${hash}`;
};

/**
 * This will generate the jwt token on the basis of input parameters
 * @param {*} userJson
 * @param {*} expiry_time
 * @param {*} privateCertKey
 * @param {*} private_pem_passphrase
 */
exports.generateXApiRefreshToken = (
  type,
  userJson,
  expiry_time,
  privateCertKey,
  private_pem_passphrase
) => {
  if (type == globalConstant.X_API_KEY) {
    userJson[globalConstant.SET_REFRESH_TOKEN_FIELD_NAME] = false;
  } else if (type == globalConstant.REFRESH_TOKEN) {
    userJson[globalConstant.SET_REFRESH_TOKEN_FIELD_NAME] = true;
  }
  logger.debug(`Generating ${type} jwt token`);
  let refresh_token = this.generateToken(
    userJson,
    expiry_time,
    privateCertKey,
    private_pem_passphrase
  );
  return refresh_token;
};
