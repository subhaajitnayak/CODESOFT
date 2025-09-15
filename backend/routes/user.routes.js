import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import authenticateToken from '../middleware/isAuthenticated.js';
import { singleUpload, uploadFields } from '../middleware/multer.js';

const routers = express.Router();

routers.route("/register").post(uploadFields, register);
routers.route("/login").post(login);
routers.route("/logout").post(logout);
routers.route("/profile/update").post(uploadFields, authenticateToken, updateProfile);

export default routers;