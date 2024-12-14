  let Joi = require('joi');
module.exports.listingSchema = Joi.object({
    newdata: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().allow("",null),
        price:Joi.number().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        
    }).required(),
})