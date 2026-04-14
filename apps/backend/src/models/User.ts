import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,   
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "dev"],
        default: "user",
    },
}, {
    collection: "users",
    timestamps: true,
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel