import mongoose from "mongoose";
const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        
    },
    location: {
        type: String,
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }],
    logo: {
        type: String,
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{timestamps: true});

const Company = mongoose.model("Company", companySchema);
export default Company;