const joi = require('joi');

module.exports = joi.object({
  pwa_origin: joi.string().required(),
  github_repository: joi.string().required(),
});
