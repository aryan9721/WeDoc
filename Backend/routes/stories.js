const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const stories = require("../models/stories");
const ErrorResponse = require("../utils/errorResponse");

router.get('/',(req,res)=>{
    stories.find({})
    .then((storiess) => {
        return res.json(storiess);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.post('/',(req,res)=>{
    const { title,description,link } = req.body;
    stories.create({  title,description,link })
    .then((_stories) => {
        res.json(_stories);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})
 
module.exports = router;