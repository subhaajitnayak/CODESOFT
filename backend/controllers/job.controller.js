import Job from '../models/job.model.js';

export const postJob = async (req, res) => {
    try{
        const {
            title,
            description,
            requirements,
            companyId,
            location,
            salary,
            jobType,
            position,
            experience,
        } = req.body;
        const userId = req.id;
        if(
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !companyId ||
            !experience ||
            !jobType ||
            !position ||
            !location
        ){
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            jobType,
            company: companyId,
            location,
            position,
            experience: experience,
            created_by: userId,
        });
        return res.status(201).json({ message: "Job created successfully", job, success: true });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error creating job", success: false });
    }
};

export const getAllJobs = async (req, res) => {
    try{
        const keywords = req.query.keywords || '';
        let jobs;
        if (!keywords.trim()) {
            // No keywords: return all jobs
            jobs = await Job.find().populate({path: "company"}).sort({ createdAt: -1 });
        } else {
            // Keywords present: filter
            const query = {
                $or: [
                    {title: { $regex: keywords, $options: 'i' }},
                    {description: { $regex: keywords, $options: 'i' }},
                    {requirements: { $regex: keywords, $options: 'i' }},
                    {position: { $regex: keywords, $options: 'i' }},
                    {location: { $regex: keywords, $options: 'i' }},
                    {jobType: { $regex: keywords, $options: 'i' }},
                ],
            };
            jobs = await Job.find(query).populate({path: "company"}).sort({ createdAt: -1 });
        }
        return res.status(200).json({ jobs, success: true });
    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error getting all jobs", success: false });
    }
};



export const getJobById = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application"
        });
        if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
        }
        return res.status(200).json({ job, success: true });

    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error getting job by ID", success: false });
    }
};


export const getAdminJobs = async (req, res) => {
    try{
        const userId = req.id;
        const jobs = await Job.find({ created_by: userId }).sort({ createdAt: -1 }).populate({
            path: "company",
        });
        if(jobs.length === 0){
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({ jobs, success: true });
    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error getting admin jobs", success: false });
    }
};



export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            requirements,
            companyId,
            location,
            salary,
            jobType,
            position,
            experience,
        } = req.body;
        const userId = req.id;

        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !companyId ||
            !experience ||
            !jobType ||
            !position ||
            !location
        ) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const job = await Job.findOneAndUpdate(
            { _id: id, created_by: userId },
            {
                title,
                description,
                requirements: requirements.split(','),
                salary: Number(salary),
                jobType,
                company: companyId,
                location,
                position,
                experience,
            },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ message: "Job not found or unauthorized", success: false });
        }

        return res.status(200).json({ message: "Job updated successfully", job, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error updating job", success: false });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.id;

        const job = await Job.findOneAndDelete({ _id: id, created_by: userId });

        if (!job) {
            return res.status(404).json({ message: "Job not found or unauthorized", success: false });
        }

        return res.status(200).json({ message: "Job deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error deleting job", success: false });
    }
};
