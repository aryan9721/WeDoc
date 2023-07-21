const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const authenticate = require("../middlewares/authenticate");
const references = require("../models/references");
const ErrorResponse = require("../utils/errorResponse");


router.get('/from',authenticate,(req,res)=>{
    const {userId} = req.jwt;
    console.log(userId);
    references.find({referredTo: userId})
    .then((_references) => {
        res.json(_references);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.get('/',(req,res)=>{
    references.find({})
    .then((referencess) => {
        return res.json(referencess);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.get('/to',authenticate,(req,res)=>{
    const {userId} = req.jwt;
    references.find({referredFrom: userId})
    .then((_references) => {
        res.json(_references);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})


router.post('/',(req,res)=>{
    const { referenceDateTime,name,referredFrom,referredTo,reason,contact } = req.body;

    references.create({ referenceDateTime,name,referredFrom,referredTo,reason,contact })
    .then((_references) => {
        res.json(_references);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

module.exports = router;