const cors = require('cors');
const next = require('next');
const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const Sentiment = require('sentiment');

const dev = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handler = app.getRequestHandler();
const sentiment = new Sentiment();

/*========================================================================
// Environmental variables referencing next.config.js.
========================================================================*/
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
});

/*========================================================================
// Setup Node/Express server.
========================================================================*/
app.prepare()
    .then(() => {
        const server = express();
        const chatHistory = { messages: [] };

        server.use(cors());
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true }));

        /*========================================================================
        // Default GET handler.
        ========================================================================*/
        server.get('*', (req, res) => {
            return handler(req, res);
        });

        /*========================================================================
        // POST a new message to a chatroom. The name of the chatroom is passed
        // in as req.body.room.
        ========================================================================*/
        server.post('/message', (req, res, next) => {
            const { user = null, message = '', timestamp = + new Date } = req.body.chat;
            const sentimentScore = sentiment.analyze(message).score;
            const chat = { user, message, timestamp, sentiment: sentimentScore };
        
            chatHistory.messages.push(chat);
            pusher.trigger(req.body.room, 'new-message', { chat });
        });
    
        /*========================================================================
        // Retrieve a list of all existing messages relevant to the user in a
        // particular chatroom.
        ========================================================================*/
        server.post('/messages', (req, res, next) => {
            console.log(res);
            console.log(chatHistory);
            res.json({ ...chatHistory, status: 'success' });
        });

        /*========================================================================
        // Listen on environment port or default to 3000.
        ========================================================================*/
        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });

    })
    /*========================================================================
    // Error catcher.
    ========================================================================*/
    .catch(error => {
        console.error(error.stack);
        process.exit(1);
    });