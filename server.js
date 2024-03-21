// Here we will be sending static webpages and for this there are a few things.
// First of all to send them we will use a middleware which allow us to send static
// web pages. and in that we will define the folder that we want to send. 

const express = require("express")
const path = require("path")

const friendsRouters = require('./routers/friends.routers')
const messagesRouters = require('./routers/messages.routers')

const app = express()

// This a middleware which we are using ... since the data that we get from the 
// web or client in the post request is json (that is when the client post/sends us data)
// we cannot read this in JS so we have to convert to JS and having this middleware 
// will do it without us having to convert the data into js 
app.use(express.json());

// !!!!!! HERE IS THE CHANGE !!!!!!!
app.use('/site', express.static(path.join(__dirname, 'public')))

app.use((req,res,next) => {
    console.log(`${req.method}${req.baseUrl} ${req.url}`)
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

// app.use(friendsRouter) This is if you keep the base url of friends 
app.use('/friends', friendsRouters.friendsRouter)

app.use(messagesRouters.messagesRouter)

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