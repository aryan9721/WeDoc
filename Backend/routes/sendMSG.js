const axios = require('axios');
const logger = require('../utils/logger');

async function sendOTP(mobileNumber, message) {
  const authkey = '353289A0mspYzcgG6019898eP1';
  const sender = 'PRKCLP';
  const route = 4;
  const country = 91;
  const DLT_TE_ID = '1207168864174864146';
  
  // Replace the placeholder mobile number and message in the URL
  const apiUrl = `http://otpsms.vision360solutions.in/api/sendhttp.php?authkey=${authkey}&sender=${sender}&route=${route}&country=${country}&DLT_TE_ID=${DLT_TE_ID}&mobiles=${mobileNumber}&message=${encodeURIComponent(message)}`;
  logger.debug(apiUrl);
  try {
    const response = await axios.get(apiUrl);
    console.log('OTP sent successfully!');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error sending OTP:', error.message);
  }
}

module.exports = sendOTP;
