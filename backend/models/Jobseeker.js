const mongoose = require("mongoose");

const JobseekerSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        sparse: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Phonenumber: {
        type: String,
        required: true,
        trim: true
    },
    DateofBirth: {
        type: Date,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true,
        unique: true
    },
    City: {
        type: String,
        required: true
    },
    Field: {
        type: String,
        required: true
    },
    WorkExperience: {
        type: String,
        required: true
    },
    UniversityCollege: {
        type: String,
        required: true
    },
    GraduationYear: {
        type: Number,
        required: true
    },
   CV: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Jobseeker", JobseekerSchema);