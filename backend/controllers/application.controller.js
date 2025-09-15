import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({ message: "Missing job ID", success: false });
        }
        //check if the user has already applied to the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job", success: false });
        }
        //check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        //create new application
        const newApplication = new Application({
            job: jobId,
            applicant: userId,
        });
        await newApplication.save();
        if(!job.application) job.application = [];
        job.application.push(newApplication._id);
        await job.save();


        return res.status(201).json({ message: "Application submitted successfully", success: true });

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error applying for job", success: false });
    }
};


export const getAppliedJobs = async (req, res) => {
    try{
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({createdAt: -1}).populate({path: 'job', options: {sort:{createdAt: -1}},populate:{path: 'company',
                options: {sort:{createdAt: -1}}}});
                if(applications.length === 0){
            return res.status(404).json({ message: "No applications found", success: false });
                }
        return res.status(200).json({ applications, success: true });

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error getting applied jobs", success: false });
    }
};


export const getJobApplications = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'application',
            options: {sort:{createdAt: -1}},
            populate:[
                {path: 'applicant'},
                {path: 'job', populate: {path: 'company'}}
            ]
        });
            if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
            }
            return res.status(200).json({ job, success: true });

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error getting job applications", success: false });
    }
};



export const updateStatus = async (req, res) => {
    try{
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({ message: "Missing status", success: false });
        }

        // Validate status against allowed values
        const allowedStatuses = ["pending", "accepted", "rejected"];
        const normalizedStatus = status.toLowerCase();
        if(!allowedStatuses.includes(normalizedStatus)){
            return res.status(400).json({
                message: `Invalid status. Allowed values are: ${allowedStatuses.join(", ")}`,
                success: false
            });
        }

        //find the application
        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({ message: "Application not found", success: false });
        }

        //update the status
        application.status = normalizedStatus;
        await application.save();
        return res.status(200).json({
            message: "Application status updated successfully",
            status: normalizedStatus,
            success: true
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error updating application status", success: false });
    }
};
