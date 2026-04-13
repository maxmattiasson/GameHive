import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,   
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "user",
    },
}, {
    collection: "User",
    timestamps: true,
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel