const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('_middleware/validate-request')
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role')
const userService = require('./user.service')

// routes
router.post('/authenticate', authenticateSchema, authenticate)
router.post('/refresh-token', refreshToken)
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken)
router.post('/register', registerSchema, register)
router.post('/verify-email', verifyEmailSchema, verifyEmail)
router.post('/forgot-password', forgotPasswordSchema, forgotPassword)
router.post(
  '/validate-reset-token',
  validateResetTokenSchema,
  validateResetToken
)
router.post('/reset-password', resetPasswordSchema, resetPassword)
router.get('/', authorize(Role.Admin), getAll)
router.get('/:id', authorize(), getById)
router.post('/', authorize(Role.Admin), createSchema, create)
router.put('/:id', authorize(), updateSchema, update)
router.delete('/:id', authorize(), _delete)

module.exports = router

function authenticateSchema (req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  validateRequest(req, next, schema)
}

function authenticate (req, res, next) {
  const { email, password } = req.body
  const ipAddress = req.ip
  userService
    .authenticate({ email, password, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken)
      res.json(user)
    })
    .catch(next)
}

function refreshToken (req, res, next) {
  const token = req.cookies.refreshToken
  const ipAddress = req.ip
  userService
    .refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken)
      res.json(user)
    })
    .catch(next)
}

function revokeTokenSchema (req, res, next) {
  const schema = Joi.object({
    token: Joi.string().empty('')
  })
  validateRequest(req, next, schema)
}

function revokeToken (req, res, next) {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken
  const ipAddress = req.ip

  if (!token) return res.status(400).json({ message: 'Token is required' })

  // users can revoke their own tokens and admins can revoke any tokens
  if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  userService
    .revokeToken({ token, ipAddress })
    .then(() => res.json({ message: 'Token revoked' }))
    .catch(next)
}

function registerSchema (req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    acceptTerms: Joi.boolean().valid(true).required()
  })
  validateRequest(req, next, schema)
}

function register (req, res, next) {
  userService
    .register(req.body, req.get('origin'))
    .then(() =>
      res.json({
        message:
          'Registration successful, please check your email for verification instructions'
      })
    )
    .catch(next)
}

function verifyEmailSchema (req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required()
  })
  validateRequest(req, next, schema)
}

function verifyEmail (req, res, next) {
  userService
    .verifyEmail(req.body)
    .then(() =>
      res.json({ message: 'Verification successful, you can now login' })
    )
    .catch(next)
}

function forgotPasswordSchema (req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required()
  })
  validateRequest(req, next, schema)
}

function forgotPassword (req, res, next) {
  userService
    .forgotPassword(req.body, req.get('origin'))
    .then(() =>
      res.json({
        message:
          'Please check your email for password reset instructions'
      })
    )
    .catch(next)
}

function validateResetTokenSchema (req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required()
  })
  validateRequest(req, next, schema)
}

function validateResetToken (req, res, next) {
  userService
    .validateResetToken(req.body)
    .then(() => res.json({ message: 'Token is valid' }))
    .catch(next)
}

function resetPasswordSchema (req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  })
  validateRequest(req, next, schema)
}

function resetPassword (req, res, next) {
  userService
    .resetPassword(req.body)
    .then(() =>
      res.json({ message: 'Password reset successful, you can now login' })
    )
    .catch(next)
}

function getAll (req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next)
}

function getById (req, res, next) {
  // users can get their own user and admins can get any user
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch(next)
}

function createSchema (req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().valid(Role.Admin, Role.User).required()
  })
  validateRequest(req, next, schema)
}

function create (req, res, next) {
  userService
    .create(req.body)
    .then((user) => res.json(user))
    .catch(next)
}

function updateSchema (req, res, next) {
  const schemaRules = {
    email: Joi.string().email().empty(''),
    password: Joi.string().min(6).empty(''),
    confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
  }

  // only admins can update role
  if (req.user.role === Role.Admin) {
    schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('')
  }

  const schema = Joi.object(schemaRules).with('password', 'confirmPassword')
  validateRequest(req, next, schema)
}

function update (req, res, next) {
  // users can update their own account and admins can update any user
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  userService
    .update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(next)
}

function _delete (req, res, next) {
  // users can delete their own account and admins can delete any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  userService
    .delete(req.params.id)
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(next)
}

// helper functions

function setTokenCookie (res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
  res.cookie('refreshToken', token, cookieOptions)
}
