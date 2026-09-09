
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const JobseekerRoutes=require('./routes/JobseekerRoutes'); 
const CompanyRoutes=require('./routes/CompanyRoutes');
const authRoutes=require('./routes/authRoutes');
const dashboardRoutes=require('./routes/dashboardRoutes');
const app=express();

app.use(cors());
app.use(express.json());
app.use("/Jobseekers", JobseekerRoutes);
app.use("/Companies", CompanyRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000,()=>{
        console.log('Server is running on port 5000');
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exitCode = 1;
});
   

