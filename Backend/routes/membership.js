const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const membership_plan = require("../models/membership_plan");
const membership = require("../models/membership");
const ErrorResponse = require("../utils/errorResponse");
const fetch = require('node-fetch');

router.get('/',(req,res)=>{
    membership.find({})
    .then((memberships) => {
        return res.json(memberships);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

// router.get('/:objectId',(req,res)=>{
//     const objectId = req.params.objectId;
//     membership.find({_id: objectId})
//     .then((memberships) => {
//         return res.json(memberships);
//     })
//     .catch(e => {
//         let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
//         return res
//         .status(500)
//         .json(errorResponse.getErrorResponse());
//     });
// })

router.post('/plan',(req,res)=>{
    const { name,duration,amount,association } = req.body;
    const url = 'https://api.stripe.com/v1/prices';
    const token = 'sk_test_51N8JrbSEJVi6GucGhDjvIZVlBydlOap5XvURgH3hB7sdgXrTkiKDI4nOXrqtZ2tH5pIJAS6blOgpSvH6BrNqt4Up00zTyoZ07K';
    const currency = 'inr';

    const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${token}`
    };

    const data = new URLSearchParams({
    'unit_amount': amount*100,
    'currency': currency,
    'product_data[name]': name
    });

    const options = {
    method: 'POST',
    headers: headers,
    body: data
    };
    fetch(url, options)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        return membership_plan.create({ name,duration,amount,association,stripe_price_object: data.id });
    })
    .then((_membership) => {
        return res.json(_membership);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.get('/plan',(req,res)=>{
    membership_plan.find({})
    .then((memberships) => {
        return res.json(memberships);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.get('/plan/:objectId',(req,res)=>{
    const objectId = req.params.objectId;
    membership_plan.findOne({_id: objectId})
    .then((memberships) => {
        return res.json(memberships);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.put('/plan',(req,res)=>{
    const { name,duration,amount,id } = req.body;
    membership_plan.updateOne({"_id": id},
    {
        $set: { name,duration,amount}
    })
    .then((status) => {
        return membership_plan.findById(id);
    })
    .then((plan) => {
        res.json(plan);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.post('/',(req,res)=>{
    const { name,association,buyDate,expiryDate,status,plan } = req.body;
    membership.create({  name,association,buyDate,expiryDate,status,plan })
    .then((_membership) => {
        res.json(_membership);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, 500);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})

router.delete('/',(req,res)=>{
    logger.debug("deleting the membership");
    const {membershipId} = req.body;
    membership.deleteOne({ _id: membershipId })
    .then(() => {
        return res.json({message: "membership deleted", status:200})
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(400)
        .json(errorResponse.getErrorResponse());
    });
})

router.get('/membership_plan',(req,res)=>{
    const {association}  = req.query;
    membership_plan.find({association})
    .then((membership_plans) => {
        return res.json(membership_plans);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})


router.get('/membership',(req,res)=>{
    const {association}  = req.query;
    membership.find({association})
    .then((memberships) => {
        return res.json(memberships);
    })
    .catch(e => {
        let errorResponse = new ErrorResponse(e.message, HttpStatus.BAD_REQUEST);  
        return res
        .status(500)
        .json(errorResponse.getErrorResponse());
    });
})


module.exports = router;