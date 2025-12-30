import express from "express";
import { getQuestions, getTechnologies, getLevels } from "../controller/quizController.js";

const quizRouter = express.Router();

quizRouter.get("/questions", getQuestions);
quizRouter.get("/technologies", getTechnologies);
quizRouter.get("/levels", getLevels);

export default quizRouter;
