const express = require('express');

const router = express.Router();

const { loginController, signUpController, logoutController} = require('../controllers/authController');

const {dashboard} = require('../controllers/dashboardController');

const { authenticated } = require('../middleware/authenticated');

const { webhook , webhook_message} = require('../controllers/whatsapp/webhook');

const limiter = require('../middleware/rateLimiter');
const { sendWhatsAppTextMessage, sendWhatsAppImageMessage, sendWhatsappVideoMessage, sendWhatsappDocumentMessage, sendWhatsappAudioMessage} = require('../controllers/whatsapp/messages');


router.post('/register', signUpController)
router.post('/login', loginController)
router.post('/logout', authenticated, logoutController)
router.get('/webhook', webhook)
router.post('/webhook', webhook_message)
router.post('/dashboard', authenticated, dashboard)
router.post('/text-message', sendWhatsAppTextMessage)
router.post('/image-message', sendWhatsAppImageMessage)
router.post('/video-message', sendWhatsappVideoMessage)
router.post('/document-message', sendWhatsappDocumentMessage)
router.post('/audio-message', sendWhatsappAudioMessage)


module.exports = router;