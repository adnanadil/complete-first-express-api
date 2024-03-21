const friends = require('../models/friends')

function getFriends (req,res) {
    res.json(friends)
}

function getFriendById (req,res) {
    const id = req.params.value 
    console.log(`This is the value which is sent ${id}`)

    // If you don't send a response the will keep hanging/loading
    res.json(friends[id])
}

function addNewFriend (req,res) {
    // the value that you are getting in req.body is JSON which we cannot read and understand
    // to understand this code and convert the JSON to JS object we have to make use of middleware 
    // which is called express.json() I have defined it at the start. 
    // Tip: remove the middleware and see you will not be able to read the data.
    // BETTER TO KEEP THIS LINE OF CODE AFTER CHECK AS IT DOES NOT HAVE A CHECK AS 
    // THIS MIGHT CRASH THE SEVER. 
    console.log(req.body.name)

    // Ok now we have to make sure that the value name that is sent is correct and 
    // not some nonsence value.
    const name = req.body.name

    if (name) {

        // adding the new frind to my array (which is my database 😜) if the name is there
        friends.push({
            name: req.body.name,
            id : friends.length
        })
        
        res.status(200).json(friends)

        // This is in place to prevent to res in one file
        return
    }

    // Note we can send the status and the response together like below 
    res.status(400).json("send a proper name")

}

module.exports = {
    getFriends,
    getFriendById,
    addNewFriend
}