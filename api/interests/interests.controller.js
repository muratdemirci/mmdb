const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('_middleware/validate-request')
const interestService = require('./interests.service')

//routes
router.post('/crawl', crawlSchema, interestService.crawlInterests)
router.get('/seed', seedSchema, getRecommendations)
router.get('/feed', feedSchema, getRecommendations)

function getRecommendations(req, res, next) {
  interestService
  .interestFeed(req)
  .then((recommendations) => res.json(recommendations))
  .catch(next)
}

// function getRecommendations(req, res, next) {
//   interestService
//   .interestFeed(req)
//   .then((recommendations) => res.json(recommendations))
//   .catch(next)
// }


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

function seedSchema(req, res, next) {
  const schema = Joi.object({
    fingerPrint: Joi.string().length(32).required(),
  })
  validateRequest(req, next, schema)
}