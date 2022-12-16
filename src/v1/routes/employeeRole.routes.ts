import express from "express";
import EmployeeRoleController from "../controller/employeeRole.controller";

export const routes = express.Router();

routes.post("/employee-role", EmployeeRoleController.createEmployeeRole);
