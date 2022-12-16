import express from "express";
import SubjectController from "../controller/subject.controller";

export const routes = express.Router();

routes.post("/subject", SubjectController.createSubject);
