const path = require('path')

function getMessage (req,res) {
    const location = path.join(__dirname, '..' , 'public', 'asserts', 'skimountain.jpg')
    // res.send('<ul><li>Message list</li></ul>')
    // res.sendFile(location)
    res.render('message', {
        title: "Messages",
        heading: "Buzz man"
    })
}

function postMessage (req,res) {
    console.log(`Updating the message`)
}

module.exports = {
    getMessage,
    postMessage
}

