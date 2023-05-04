const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');
const UserModel = new Mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        isDeleted: {
            type:Boolean,
            default:false
        }
    },
    { timestamps: true}
);
const UserSchema = Mongoose.model("user", UserModel);
module.exports = UserSchema;