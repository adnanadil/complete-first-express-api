const express = require('express')

const messageController = require('../controllers/message.controller')


// Routers Comment: Repeating the same for messages route but keeping the base url

const messagesRouter = express.Router()

messagesRouter.get('/message', messageController.getMessage)

messagesRouter.post('/message', messageController.postMessage)

module.exports = {
    messagesRouter
}