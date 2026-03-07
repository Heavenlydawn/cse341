const { check, validationResult } = require("express-validator");

const ValidationRules = () => {
    return [
        check("name")
            .notEmpty()
            .withMessage("Movie name is required")
            .isString()
            .withMessage("Movie name must be a string"),
        
        check("description")
            .notEmpty()
            .withMessage("Description is required")
            .isString()
            .withMessage("Description must be a string"),
        
        check("year")
            .notEmpty()
            .withMessage("Year is required")
            .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
            .withMessage(
                "Year must be a valid integer between 1888 and 5 years from now"),

        check("rating")
            .notEmpty()
            .withMessage("Rating is required")
            .isFloat({ min: 0.0, max: 10.0 })
            .withMessage("Rating must be  a float between 0.0 and 10.0"),
        
        check("genre")
            .notEmpty()
            .withMessage("Genre is required")
            .isArray()
            .withMessage("Genre must be an array of strings"),
        
        check("cast")
            .notEmpty()
            .withMessage("Cast is required")
            .isArray()
            .withMessage("Cast must be an array of strings"),
        
        check("directors")
            .notEmpty()
            .withMessage("Directors are required")
            .isArray()
            .withMessage("Directors must be an array of strings"),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }
    
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    ValidationRules,
    validate,
};
