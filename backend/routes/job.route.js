import express from 'express';

import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob, deleteJob } from '../controllers/job.controller.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const routers = express.Router();

routers.post("/post", authenticateToken,postJob);
routers.get("/get", getAllJobs);
routers.get("/admin", authenticateToken, getAdminJobs);
routers.get("/:id", authenticateToken, getJobById);
routers.put("/:id", authenticateToken, updateJob);
routers.delete("/:id", authenticateToken, deleteJob);

export default routers;