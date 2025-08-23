import express from 'express';
import mongooose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();

mongooose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});



const app = express();


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.use((err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    const message = err.message ? err.message : 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
    });

});

