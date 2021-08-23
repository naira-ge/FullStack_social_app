const Joi = require('joi');

const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ["com", "net"] },
});

const pin = Joi.number().min(10000).max(999999).required();
const phone = Joi.number().min(400000001).max(500000001).required();

const newPassword = Joi.string().min(3).max(30).required();

const shortStr = Joi.string().min(1).max(50);
const longStr = Joi.string().min(1).max(1000);


const resetPassReqValidation = (req, res, next) => {    
    const schema = Joi.object({ email });
    const value = schema.validate(req.body);
    if (value.error) {
        return res.json({ status: 'error', message: value.error.message });
    }
        
    next();
};

const updatePassValidation = (req, res, next) => {
    
    const schema = Joi.object({ email, pin, newPassword });
    const value = schema.validate(req.body);
    if (value.error) {
        return res.json({ status: 'error', message: value.error.message });
    }
        
    next();
};

const createNewPostValidation = (req, res, next) => {
    const schema = Joi.object({
            title: shortStr,
            desc: longStr,
    });

    const value = schema.validate(req.body);

    if (value.error) {
        return res.status(403).json({status: "error", message: value.error.message});
    }

    next();
};

const replyPostMessageValidation = (req, res, next) => {
    const schema = Joi.object({
            sender: shortStr,
            message:longStr,
    });

    const value = schema.validate(req.body);

    if (value.error) {
        return res.status(403).json({status: "error", message: value.error.message});
    }

    next();
};

module.exports = {
    resetPassReqValidation,
    updatePassValidation,
    createNewPostValidation,
    replyPostMessageValidation
}