// In this branch we will be making use of express routers, basically express routers
// help us create seperate APIs in our aplication which will take care of seperate 
// business logic (in our case we will have separate routes for friends and messages)

// Routers comment: WILL START LIKE THIS !!

// More info can be found in the docs as Routers is also a middleware
// From google search: https://expressjs.com/en/guide/using-middleware.html

const express = require("express")

const friendsController = require('./controllers/friends.controller')
const messageController = require('./controllers/message.controller')

const app = express()

// This a middleware which we are using ... since the data that we get from the 
// web or client in the post request is json (that is when the client post/sends us data)
// we cannot read this in JS so we have to convert to JS and having this middleware 
// will do it without us having to convert the data into js 
app.use(express.json());

app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`)
    const start = new Date()
    
    // If you don't add this the front end will keep waiting for the response as we don't move 
    // forward
    next()

    // Since we come back to the first middleware before sending the response out we put the 
    // calculate function here as next() sends to next middleware or the routes and it returns 
    // back to middleware and excutes from after the run function to send res

    const difference = new Date() - start
    console.log(` The time it took ${difference} mili seconds`)

})

app.get('/', (req, res) => {
    res.send('Hello there')
})

// Routers Comment: Instead of using app.get we will be using our customer routers name 
// and get as this will help us seperate the business logic. NOTE at the end we have 
// to call app.use and give the name of our router. More on that while defining the router

const friendsRouter = express.Router()


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

// app.use(friendsRouter) This is if you keep the base url of friends 
app.use('/friends', friendsRouter)


// Routers Comment: Repeating the same for messages route but keeping the base url

const messagesRouter = express.Router()

messagesRouter.get('/message', messageController.getMessage)

messagesRouter.post('/message', messageController.postMessage)

app.use(messagesRouter)

app.listen(3000, () => {
    console.log("server is running at local host 3000")
})

// NOTES ON MODEL VIEW CONTROLLER.... 
// The end points that the client hits (the functions) is the controller so we 
// put all our functions under one controller file 

// The model is the database in our case the friends array and hence it is put 
// under a seperate folder and file

// The view is the JSON that we said and since it is plain json we will not do a lot with 
// it.. 

// In the next stage we will be making use of the express routes more on the in the 
// next branch. 