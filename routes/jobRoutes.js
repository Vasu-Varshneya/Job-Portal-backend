import express from "express";
import { getAllJobs } from "../controllers/jobController.js";
import { postJob } from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyJobs} from "../controllers/jobController.js";
import { getSingleJob } from "../controllers/jobController.js";
import { updateJob,deleteJob } from "../controllers/jobController.js"
const router = express.Router();

router.get("/getall", getAllJobs);
router.post('/post',isAuthenticated,postJob)
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.get("/:id", isAuthenticated, getSingleJob);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;