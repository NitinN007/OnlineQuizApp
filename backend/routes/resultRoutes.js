import express from "express"
import authMiddleWare  from "../middleware/auth.js"
import { createResult, listResult } from "../controller/resultController.js";
const resultRouter = express.Router();
resultRouter.post('/',authMiddleWare,createResult);
resultRouter.get('/',authMiddleWare,listResult);
export default resultRouter;