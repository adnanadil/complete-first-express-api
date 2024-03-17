function getMessage (req,res) {
    res.send('<ul><li>Message list</li></ul>')
}

function postMessage (req,res) {
    console.log(`Updating the message`)
}

module.exports = {
    getMessage,
    postMessage
}

