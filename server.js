// Here we will be making use of templating engine and for that we will move the html
// file from the public folder location and we will be using handle bars to define 
// a new kind of a html using handle bars which will dynamically have the contents 
// of the page ready before being sent to the clinet with the right data. 

// For the fist of all we will have to npm install the templating engine that we want 
// Followed by that we will sent the rule of the app to set the type of templating engine
// that we are making use of. 
// Once that is done we then use the render method to render a specific handle bar file 
// once an end point is hit. 

// so the render functions will be in the get messges part and the root path. 

const express = require("express")
const path = require("path")

const friendsRouters = require('./routers/friends.routers')
const messagesRouters = require('./routers/messages.routers')

const app = express()
// const hbs = require('hbs')


app.use(express.json());

// HERE WE are setting the app property to make use handlebars templating engine 
// More info here https://www.geeksforgeeks.org/handlebars-templating-in-expressjs/
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'render'), )
app.get('/', (req,res) => {
    res.render('index', {
        title: "Hello Adnan",
        heading: "Yes !!!"
    })
})

// If you are using this in that case you will have to edit the file location in 
// in the handle bar 
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