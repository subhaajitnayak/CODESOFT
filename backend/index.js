import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRouter from './routes/user.routes.js';
import CompanyRouter from './routes/company.route.js';
import jobRouter from './routes/job.route.js';
import applicationRouter from './routes/application.route.js';
dotenv.config({})
const app = express();



// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    credentials: true,
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 5011;

//api's
app.use('/api/users', userRouter);
app.use('/api/company', CompanyRouter);
app.use('/api/job', jobRouter);
app.use('/api/application', applicationRouter);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

app.on('error', (err) => {
    console.error('Server error:', err);
});
