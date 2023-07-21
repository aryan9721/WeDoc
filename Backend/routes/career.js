const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const career = require("../models/career");
const ErrorResponse = require("../utils/errorResponse");

router.get('/',(req,res)=>{
    career.find({})
    .then((careers) => {
        return res.json(careers);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.post('/',(req,res)=>{
    const { jobTitle,company,workplaceType,location,description,jobType } = req.body;
    career.create({ jobTitle,company,workplaceType,location,description,jobType })
    .then((_career) => {
        res.json(_career);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})
 
module.exports = router;