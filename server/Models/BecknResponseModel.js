//schema specification
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const BecknResponseSchema = new mongoose.Schema({
    context : {
        type: Object,
        required: true,
    },
    error : {
        type: Object,
        required: false,
    }
})

module.exports = mongoose.model('becknResponse', BecknResponseSchema)