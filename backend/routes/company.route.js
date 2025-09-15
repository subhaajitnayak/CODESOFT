import express from 'express';
import multer from 'multer';

import authenticateToken from '../middleware/isAuthenticated.js';
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(("/register"),authenticateToken,registerCompany);
router.get(("/get"),authenticateToken,getAllCompanies);
router.get("/get/:id",authenticateToken,getCompanyById);
router.put("/update/:id",authenticateToken, upload.single('file'), updateCompany);

export default router;
