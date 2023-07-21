const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const advertisment = require("../models/advertisment");
const ErrorResponse = require("../utils/errorResponse");
const authenticate = require("../middlewares/authenticate");

router.get('/',authenticate,(req,res)=>{
    advertisment.find({"userId": req.jwt.userId})
    .then((advertisments) => {
        return res.json(advertisments);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.post('/',authenticate,(req,res)=>{
    const { description,link } = req.body;
    advertisment.create({ description,link,"userId": req.jwt.userId })
    .then((_advertisment) => {
        res.json(_advertisment);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})
 
module.exports = router;