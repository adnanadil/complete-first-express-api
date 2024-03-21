const path = require('path')

function getMessage (req,res) {
    const location = path.join(__dirname, '..' , 'public', 'asserts', 'skimountain.jpg')
    // res.send('<ul><li>Message list</li></ul>')
    res.sendFile(location)
}

function postMessage (req,res) {
    console.log(`Updating the message`)
}

module.exports = {
    getMessage,
    postMessage
}

