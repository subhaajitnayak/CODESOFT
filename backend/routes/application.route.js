import express from 'express';

import authenticateToken from '../middleware/isAuthenticated.js';
import { applyJob, getAppliedJobs, getJobApplications, updateStatus } from '../controllers/application.controller.js';


const routers = express.Router();

routers.post("/apply/:id", authenticateToken,applyJob);
routers.get("/get", authenticateToken, getAppliedJobs);
routers.get("/:id/applicants", authenticateToken, getJobApplications);
routers.put("/status/:id/update", authenticateToken, updateStatus);

export default routers;