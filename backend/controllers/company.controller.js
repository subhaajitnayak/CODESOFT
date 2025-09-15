import Company from '../models/company.model.js';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloud.js';

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required", success: false });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ message: "Company name already exists", success: false });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id, // logged in user id
            description: req.body.description, // company description
            website: req.body.website, // company website
            location: req.body.location, // company location
        });
        return res.status(201).json({ message: "Company registered successfully", company, success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error registering company", success: false });
    }
};

export const getAllCompanies = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find();
        if (companies.length === 0) {
            return res.status(404).json({ message: "No companies found", success: false });
        }
        return res.status(200).json({ companies, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error getting all companies", success: false });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false });
        }
        return res.status(200).json({ company, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error getting company by id", success: false });
    }
};

export const updateCompany = async (req, res) => {
    try {
        console.log("Update request received");
        console.log("Request params:", req.params);
        console.log("Request body:", req.body);
        console.log("Request user ID:", req.id);

        const { name, description, website, location } = req.body;
        const file = req.file; // multer single file upload
        console.log("Received file:", file);

        // Validation: Check required fields
        if (!name || !description) {
            return res.status(400).json({
                message: "Company name and description are required",
                success: false
            });
        }

        // Check if company exists
        const existingCompany = await Company.findById(req.params.id);
        if (!existingCompany) {
            console.log("Company not found with ID:", req.params.id);
            return res.status(404).json({ message: "Company not found", success: false });
        }

        // Check if name is being changed and if it conflicts with another company
        if (name !== existingCompany.name) {
            const nameExists = await Company.findOne({ name: name });
            if (nameExists) {
                return res.status(400).json({
                    message: "Company name already exists",
                    success: false
                });
            }
        }

        const updateData = {};

        // Only add fields if they are provided and not empty
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;

        if (file) {
            try {
                // Upload to Cloudinary
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                updateData.logo = cloudResponse.secure_url;
                console.log("Logo uploaded to Cloudinary:", updateData.logo);
            } catch (cloudError) {
                console.error("Cloudinary upload error:", cloudError);
                return res.status(500).json({
                    message: "Failed to upload logo",
                    success: false
                });
            }
        }

        console.log("Final update data:", updateData);

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        console.log("Company updated successfully:", company);
        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error("Error in updateCompany:", error);
        console.error("Error stack:", error.stack);

        // Handle specific mongoose errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                message: messages.join(', '),
                success: false
            });
        }

        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({
                message: "Company name already exists",
                success: false
            });
        }

        res.status(500).json({
            message: "Server Error updating company",
            success: false
        });
    }
};
