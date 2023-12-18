import { Router } from "express";
const router = Router();
import * as controller from "../controller/apicontroller.js";

router.post("/studentsignup", controller.studentsignup);
router.post("/studentlogin", controller.studentlogin);
router.post("/teachersignup", controller.teachersignup);
router.post("/teacherlogin", controller.teacherlogin);
router.post("/testsignup", controller.testsignup);
router.post("/testlogin", controller.testlogin);

export default router;
