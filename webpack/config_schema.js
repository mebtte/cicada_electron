const joi = require('joi');

module.exports = joi.object({
  ui_origin: joi.string().required(),
});
