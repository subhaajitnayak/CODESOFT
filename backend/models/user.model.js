import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        default: "student",
        required: true,
    },
    profile:{
        bio:{
            type: String,
        },
        skills: [{
            type: String,
        }],
        resume:{
            type: String,   //URL to resume file from database
        },
        resumeOriginalName:{
            type: String,   //Original name of resume file
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
        profilePhoto: {
            type: String,   //URL to profile photo from database
            default: "",
        },
        phoneNumberFile: {
            type: String,   //URL to phone number file from database
            default: "",
        },
        phoneNumberFileOriginalName: {
            type: String,   //Original name of phone number file
        }
    }
}, { timestamps: true });

    const User = mongoose.model("User", userSchema);
    export default User;