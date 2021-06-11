const express = require('express')
const router = express.Router()
const {
  validateUserRegistration,
  validateUserLoggingIn,
  validateUpdatingUserSubscription,
} = require('./userValidation.js')
const {
  registration,
  logIn,
  logOut,
  getCurrent,
  updateSubscription,
  avatar,
  verify,
  repeatSendEmailVerify,
} = require('../../../controllers/userController')
const upload = require('../../../helpers/uploadAvatar')

const guard = require('../../../helpers/guard')

router.get('/verify/:token', verify)
router.post('/verify', repeatSendEmailVerify)
router.patch('/', guard, validateUpdatingUserSubscription, updateSubscription)
router.post('/register', validateUserRegistration, registration)
router.post('/login', validateUserLoggingIn, logIn)
router.post('/logout', guard, logOut)
router.get('/current', guard, getCurrent)
router.patch('/avatars', [guard, upload.single('avatar')], avatar)

module.exports = router
