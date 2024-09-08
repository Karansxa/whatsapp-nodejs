require('dotenv').config();
const express = require('express');
const body_parser = require('body-parser');

const app = express().use(body_parser.json());

app.listen(8000, () => {
    console.log('Webhook is running on port 8000');
});

const webhook = async (req, res, next) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let verify_token = req.query["hub.verify_token"];

    if(mode && token)
    {
        if(mode === "subscribe" && verify_token === process.env.VERIFY_TOKEN)
        {
            res.status(200).send(challenge);
        }
        else
        {
            res.sendStatus(403).json({
                message: "Invaid Token"
            });
        }
    }
}

const webhook_message = async (req, res, next) => {
    let body = req.body;

    if(body.object)
    {
        if(body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0])
        {
            let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body.entry[0].changes[0].value.messages[0].from;
            let msg_body = body.entry[0].changes[0].value.messages[0].text.body;

            console.log("Phone Number ID: ", phone_number_id);
            console.log("From: ", from);
            console.log("Message: ", msg_body);
        }
        res.sendStatus(200);
    }
    else
    {
        res.sendStatus(404);
    }
}

module.exports = {
    webhook,
    webhook_message
}