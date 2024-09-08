require('dotenv').config();
const axios = require('axios');

// WhatsApp API credentials from environment variables
const WHATSAPP_API_URL = 'https://graph.facebook.com/v20.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID; // Your WhatsApp Phone Number ID
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN; // Your WhatsApp API Access Token

const sendWhatsAppTextMessage = async (req, res, next) => {
    const { to, message } = req.body;

        // Ensure phone number and message are provided
        if (!to || !message) {
            return res.status(400).json({
                message: 'Recipient phone number and message are required.'
            });
        }

        // WhatsApp Text message payload
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "text",
            text: {
                preview_url: true,
                body: message
            }
        };

        // Send a POST request to the WhatsApp Cloud API
        const response = await axios.post(
            `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, // Use dynamic PHONE_NUMBER_ID
            payload,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Check response status
        if(response.status === 200)
        {
            return res.status(200).json({
                message: 'WhatsApp message sent successfully!',
                response: response.data
            });
        }
}

const sendWhatsAppImageMessage = async (req, res, next) => {
    const { to, image_url, caption } = req.body;

        // Ensure phone number and image URL are provided
        if (!to || !image_url || !caption) {
            return res.status(400).json({
                message: 'Recipient phone number or image URL or Caption is missing.'
            });
        }

        // WhatsApp Image message payload
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual", 
            to: to,
            type: "image",
            image: {
                link: image_url,
                caption: caption // Compulsory Field
            }
        };

        // Send a POST request to the WhatsApp Cloud API
        const response = await axios.post(
            `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, // Use dynamic PHONE_NUMBER_ID
            payload,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Check response status
        if(response.status === 200)
        {
            return res.status(200).json({
                message: 'WhatsApp message sent successfully!',
                response: response.data
            });
        }
}

const sendWhatsappVideoMessage = async (req, res, next) => {
    const { to, video_url, caption } = req.body;

        // Ensure phone number and video URL are provided
        if (!to || !video_url || !caption) {
            return res.status(400).json({
                message: 'Recipient phone number or video URL or Caption is missing.'
            });
        }

        // WhatsApp Video message payload
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "video",
            video: {
                link: video_url,
                caption: caption // Compulsory Field
            }
        };

        // Send a POST request to the WhatsApp Cloud API
        const response = await axios.post(
            `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Check response status
        if(response.status === 200)
        {
            return res.status(200).json({
                message: 'WhatsApp message sent successfully!',
                response: response.data
            });
        }
}

const sendWhatsappDocumentMessage = async (req, res, next) => {
    const { to, document_url, caption, filename } = req.body;

        // Ensure phone number and document URL are provided
        if (!to || !document_url || !caption || !filename)  {
            return res.status(400).json({
                message: 'Recipient phone number or document URL or Caption or FileName is missing.'
            });
        }

        // WhatsApp Document message payload
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "document",
            document: {
                link: document_url,
                caption: caption, // Compulsory Field
                filename: filename // Compulsory Field
            }
        };

        // Send a POST request to the WhatsApp Cloud API
        const response = await axios.post(
            `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Check response status
        if(response.status === 200)
        {
            return res.status(200).json({
                message: 'WhatsApp message sent successfully!',
                response: response.data
            });
        }
}

const sendWhatsappAudioMessage = async (req, res, next) => {
    const { to, audio_url } = req.body;

        // Ensure phone number and audio URL are provided
        if (!to || !audio_url) {
            return res.status(400).json({
                message: 'Recipient phone number or audio URL is missing.'
            });
        }

        // WhatsApp Audio message payload
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "audio",
            audio: {
                link: audio_url
            }
        };

        // Send a POST request to the WhatsApp Cloud API
        const response = await axios.post(
            `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Check response status
        if(response.status === 200)
        {
            return res.status(200).json({
                message: 'WhatsApp message sent successfully!',
                response: response.data
            });
        }
}

const sendWhatsApp_CTA_Button_Message = async (req, res, next) => {
    const { to, message, footer, buttons } = req.body;

        // Ensure phone number and message are provided
        if (!to || !message || !footer || !buttons) {
            return res.status(400).json({
                message: 'Recipient phone number and message are required.'
            });
        }

        // WhatsApp Text message payload
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "text",
            text: {
                preview_url: true,
                body: message
            }
        };

        // Send a POST request to the WhatsApp Cloud API
        const response = await axios.post(
            `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, // Use dynamic PHONE_NUMBER_ID
            payload,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Check response status
        if(response.status === 200)
        {
            return res.status(200).json({
                message: 'WhatsApp message sent successfully!',
                response: response.data
            });
        }
}

module.exports = {
    sendWhatsAppTextMessage,
    sendWhatsAppImageMessage,
    sendWhatsappVideoMessage, 
    sendWhatsappDocumentMessage,
    sendWhatsappAudioMessage
};
