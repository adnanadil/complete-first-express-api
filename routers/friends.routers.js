// Import the controllers here and export the new routers to be used in the main server. 

const express = require('express')

const friendsController = require('../controllers/friends.controller')

// Routers Comment: Instead of using app.get we will be using our customer routers name 
// and get as this will help us seperate the business logic. NOTE at the end we have 
// to call app.use and give the name of our router. More on that while defining the router

const friendsRouter = express.Router()

// We can also make use of middle on top of this middleware 

friendsRouter.use((req,res,next) => {
    console.log(`Hello there ${req.ip}`)
    next()
})

//app.get('/friends', friendsController.getFriends)
friendsRouter.get('/', friendsController.getFriends)

// How do we handle parameters with the link 
// You can get more details in this link: https://expressjs.com/en/guide/routing.html

//app.get('/friends/:value', friendsController.getFriendById)
friendsRouter.get('/:value', friendsController.getFriendById)


//app.post('/friends', friendsController.addNewFriend)
friendsRouter.post('/', friendsController.addNewFriend)

// Routers Comment: You can see from above the changes that have been made. 
// Two options to define the middleware

module.exports = {
    friendsRouter
}
