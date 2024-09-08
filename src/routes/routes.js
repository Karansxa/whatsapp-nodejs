const express = require('express');

const router = express.Router();

const { loginController, signUpController} = require('../controllers/authController');

const {dashboard} = require('../controllers/dashboardController');

const { authenticated } = require('../middleware/authenticated');

const { webhook , webhook_message} = require('../controllers/whatsapp/webhook');

const limiter = require('../middleware/rateLimiter');
const { sendWhatsAppMessage } = require('../controllers/whatsapp/messages');


router.post('/register', signUpController)
router.post('/login', loginController)
router.get('/webhook', webhook)
router.post('/webhook', webhook_message)
router.post('/dashboard', authenticated, dashboard)
router.post('/text-message', sendWhatsAppMessage)


module.exports = router;