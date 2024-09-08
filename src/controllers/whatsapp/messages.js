require('dotenv').config();
const axios = require('axios');

// WhatsApp API credentials from environment variables
const WHATSAPP_API_URL = 'https://graph.facebook.com/v20.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID; // Your WhatsApp Phone Number ID
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN; // Your WhatsApp API Access Token

const sendWhatsAppMessage = async (req, res, next) => {
    try {
        const { to, message } = req.body;

        // Ensure phone number and message are provided
        if (!to || !message) {
            return res.status(400).json({
                message: 'Recipient phone number and message are required.'
            });
        }

        // WhatsApp message payload
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual", // Corrected spelling from 'recipent_type' to 'recipient_type'
            to: to,
            type: "text",
            text: {
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

        // Extract the id from the response
        const messageId = response.data.messages[0]?.id; 

        // Check response status
        return res.status(200).json({
            message: 'WhatsApp message sent successfully',
            messageId: messageId
        });

    } catch (error) {
        // Capture any error that occurs during the request
        if (error.response) {
            // The request was made, and the server responded with a status code
            return res.status(error.response.status).json({
                message: 'Error from WhatsApp API',
                error: error.response.data
            });
        } else if (error.request) {
            // The request was made, but no response was received
            return res.status(500).json({
                message: 'No response from WhatsApp API',
                error: 'No response received'
            });
        } else {
            // Something else happened in setting up the request
            return res.status(500).json({
                message: 'Error sending WhatsApp message',
                error: error.message
            });
        }
    }
}

module.exports = {
    sendWhatsAppMessage
};
