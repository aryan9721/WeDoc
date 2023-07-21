const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const video = require("../models/video");
const ErrorResponse = require("../utils/errorResponse");
const advertisment = require("../models/advertisment");
const authenticate = require("../middlewares/authenticate");



router.get('/',(req,res)=>{
    video.find({})
    .then((videos) => {
        return res.json(videos);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.post('/',authenticate,(req,res)=>{
    const { description,title,company } = req.body;
    video.create({ description,title,company,"userId": req.jwt.userId  })
    .then((_video) => {
        res.json(_video);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})
 
module.exports = router;