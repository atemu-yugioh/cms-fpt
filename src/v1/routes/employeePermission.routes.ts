import express from "express";
import EmployeePermissionController from "../controller/employeePermission.controller";
import requireUser from "../middleware/requireUser.middleware";

export const routes = express.Router();

routes.post(
  "/employee-permission",
  requireUser,
  EmployeePermissionController.createEmployeePermission
);

routes.patch(
  "/employee-permission",
  EmployeePermissionController.removeEmployeePermission
);
