require('dotenv').config();
const axios = require('axios');
const https = require('https');

const agent = new https.Agent({ keepAlive: true });

// WhatsApp API credentials
const WHATSAPP_API_URL = 'https://graph.facebook.com/v20.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// Helper function to send API requests
const sendWhatsAppMessage = async (payload, res) => {
    try {
        const response = await axios.post(
            `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
             
                },
                httpsAgent: agent
            }
        );

        //const errorCode = response?.data?.messages?.id || 'N/A';

        if (response.status === 200) {
            return res.status(200).json({
                message: 'WhatsApp message sent successfully!',
                response: response.data,
                //code: errorCode
            });
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error?.message || error.message;
        const errorCode = error.response?.data?.error?.code || 'N/A';
        const errorSubcode = error.response?.data?.error?.error_subcode || 'N/A';

        if(errorCode === 131030)
        {
            return res.status(500).json({
                message: `Phone Number is not whitelisted on Meta Dashboard`,
                code: errorCode,
                subcode: errorSubcode
            });
        }
        return res.status(500).json({
            message: `Failed to send WhatsApp message: ${errorMessage}`,
            code: errorCode,
            subcode: errorSubcode
        });
    }
};

// Generalized functions
const TextMessage = async (req, res) => {
    const { to, message } = req.body;
    if (!to || !message) {
        return res.status(400).json({ message: 'Recipient phone number and message are required.' });
    }
    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { preview_url: true, body: message }
    };
    await sendWhatsAppMessage(payload, res);
};

const ImageMessage = async (req, res) => {
    const { to, image_url, caption } = req.body;
    if (!to || !image_url || !caption) {
        return res.status(400).json({ message: 'Phone number, image URL, and caption are required.' });
    }

    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "image",
        image: { link: image_url, caption }
    };

    await sendWhatsAppMessage(payload, res);
};

const VideoMessage = async (req, res) => {
    const { to, video_url, caption } = req.body;
    if (!to || !video_url || !caption) {
        return res.status(400).json({ message: 'Phone number, video URL, and caption are required.' });
    }

    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "video",
        video: { link: video_url, caption }
    };

    await sendWhatsAppMessage(payload, res);
};

const DocumentMessage = async (req, res) => {
    const { to, document_url, caption } = req.body;
    if (!to || !document_url || !caption) {
        return res.status(400).json({ message: 'Phone number, document URL, and caption are required.' });
    }

    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "document",
        document: { link: document_url, caption }
    };

    await sendWhatsAppMessage(payload, res);
};

const AudioMessage = async (req, res) => {
    const { to, audio_url } = req.body;
    if (!to || !audio_url) {
        return res.status(400).json({ message: 'Phone number and audio URL are required.' });
    }

    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "audio",
        audio: { link: audio_url }
    };

    await sendWhatsAppMessage(payload, res);
};

//const sendWhatsapp_CTA_URL

module.exports = {
    TextMessage,
    ImageMessage,
    VideoMessage,
    DocumentMessage,
    AudioMessage
};
