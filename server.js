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

app.get('/friends', friendsController.getFriends)

// How do we handle parameters with the link 
// You can get more details in this link: https://expressjs.com/en/guide/routing.html
app.get('/friends/:value', friendsController.getFriendById)

// Ok here we will set the POST function... that is if the user is posting something.
// either this can be from a from fetch fucntion from the clinet or end can be done using 
// postman.

app.post('/friends', friendsController.addNewFriend)

app.get('/message', messageController.getMessage)

app.post('/message', messageController.postMessage)

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