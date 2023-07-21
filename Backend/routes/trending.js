const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const trending = require("../models/trending");
const ErrorResponse = require("../utils/errorResponse");

router.get('/',(req,res)=>{
    trending.find({})
    .then((trendings) => {
        return res.json(trendings);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.post('/',(req,res)=>{
    const { description,link } = req.body;
    trending.create({ description,link })
    .then((_trending) => {
        res.json(_trending);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})
 
module.exports = router;