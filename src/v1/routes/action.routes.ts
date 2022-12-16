import express from "express";
import ActionController from "../controller/action.controller";
import requireUser from "../middleware/requireUser.middleware";

export const routes = express.Router();

routes.post("/action", requireUser, ActionController.createAction);
