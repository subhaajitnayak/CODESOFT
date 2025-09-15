import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: [{
        type: String,
        required: true,
    }],
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        default: null,
    }]
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;