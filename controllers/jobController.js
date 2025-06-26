import { Job } from "../models/jobschema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsynError.js";
import mongoose from "mongoose";

// Get all jobs (not expired)
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

// Post a new job
export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(new ErrorHandler("Please either provide fixed salary or ranged salary.", 400));
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400));
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

// Get a single job by ID
export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Job ID format", 400));
  }

  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  res.status(200).json({
    success: true,
    job,
  });
});

// Get jobs posted by the logged-in user (Recruiter)
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  console.log(req.user._id)
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

// Update job
export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Job ID format", 400));
  }

  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

// Delete job
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Job ID format", 400));
  }

  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});
