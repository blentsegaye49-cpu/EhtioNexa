const express = require("express");
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { createJobseeker, getJobseekers, getJobseekerProfile } = require("../Controller/Jobseekercontroller");

router.get("/", getJobseekers);
router.post("/", requireAuth, createJobseeker);
router.get("/profile", requireAuth, getJobseekerProfile);

module.exports = router;