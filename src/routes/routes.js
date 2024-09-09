const express = require('express');

const router = express.Router();

const { loginController, signUpController, logoutController} = require('../controllers/authController');

const {dashboard} = require('../controllers/dashboardController');

const { authenticated } = require('../middleware/authenticated');

const { webhook , webhook_message} = require('../controllers/whatsapp/webhook');

const { TextMessage, ImageMessage, VideoMessage, DocumentMessage, AudioMessage} = require('../controllers/whatsapp/messages');


router.post('/register', signUpController)
router.post('/login', loginController)
router.post('/logout', authenticated, logoutController)
router.get('/webhook', webhook)
router.post('/webhook', webhook_message)
router.post('/dashboard', authenticated, dashboard)
router.post('/text-message', TextMessage)
router.post('/image-message', ImageMessage)
router.post('/video-message', VideoMessage)
router.post('/document-message', DocumentMessage)
router.post('/audio-message', AudioMessage)


module.exports = router;