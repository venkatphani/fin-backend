const validateInput = require("./input");

exports.validationMiddleware =
  (items, isBody = true) =>
  (req, res, next) => {
    try {
      const { errors, isValid } = validateInput(isBody ? req.body : req.query, items);
      if (!isValid) {
        return res.status(400).json({ error: errors, success: false });
      }
      return next();
    } catch (error) {
      return res.status(500).json({ error, success: false });
    }
  };

exports.validationLoopMiddleware =
  (items, key, isBody = true) =>
  (req, res, next) => {
    try {
      const paramsObject = isBody ? req.body : req.query;
      const mainParamToTest = paramsObject[key];
      if (!Array.isArray(mainParamToTest)) {
        return res.status(400).json({ error: { message: `${key} must be an array` }, success: false });
      }
      for (const [index, param] of mainParamToTest.entries()) {
        const { errors, isValid } = validateInput(param, items);
        errors.index = index;
        if (!isValid) {
          return res.status(400).json({ error: errors, success: false });
        }
      }
      return next();
    } catch (error) {
      return res.status(500).json({ error, success: false });
    }
  };
