const { check, validationResult } = require("express-validator");

const ValidationRules = () => {
  return [
    check("name")
      .notEmpty()
      .withMessage("Cinema name is required")
      .isString()
      .withMessage("Cinema name must be a string"),

    check("location")
      .notEmpty()
      .withMessage("Location is required")
      .isString()
      .withMessage("Location must be a string"),

    check("address")
      .notEmpty()
      .withMessage("Address is required")
      .isString()
      .withMessage("Address must be a string"),
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
