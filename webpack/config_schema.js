const joi = require('joi');

module.exports = joi.object({
  pwa_origin: joi.string().required(), // PWA 源, 例如 https://cicada.mebtte.com
});
