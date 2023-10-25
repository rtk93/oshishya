//schema specification
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    fullname : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    mobile : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

//hash password prior to saving the user
UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports = mongoose.model('users', UserSchema)