//schema specification
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const BecknRequestSchema = new mongoose.Schema({
    context : {
        type: Object,
        required: true,
    },
    message : {
        type: Object,
        required: true,
    }
})

module.exports = mongoose.model('becknRequest', BecknRequestSchema)