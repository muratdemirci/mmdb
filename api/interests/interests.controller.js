const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('_middleware/validate-request')
const interestService = require('./interests.service')

//routes
router.post('/crawl', crawlSchema, interestService.crawlInterests)
router.get('/feed', feedSchema, interestService.interestFeed)

module.exports = router

function crawlSchema (req, res, next) {
  const schema = Joi.object({
    fingerPrint: Joi.string().length(32).required(),
    urlPaths: Joi.array().required(),
  })
  validateRequest(req, next, schema)
}

function feedSchema(req, res, next) {
  const schema = Joi.object({
    fingerPrint: Joi.string().length(32).required(),
  })
  validateRequest(req, next, schema)
}