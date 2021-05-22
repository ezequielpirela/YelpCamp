const baseJoi = require('joi');
const sanitizeHTML = require('sanitize-html')
const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!"
    },
    rules: {
        escapeHTML: {
            validate(value, helpers){
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAtributes: {},
                });
                if(clean !== value){
                    return helpers.error('string.escapeHTML', {value})
                }
                return clean;
            }
        }
    }
});
const Joi = baseJoi.extend(extension);
module.exports.campgroundSchema = Joi.object({
    campgrounds: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        description: Joi.string().required().escapeHTML(),
        // image: Joi.string().required(),
        location: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
});
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})