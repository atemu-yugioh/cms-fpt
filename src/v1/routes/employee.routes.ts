import express from "express";
import EmployeeController from "../controller/employee.controller";
import requireUser from "../middleware/requireUser.middleware";

export const routes = express.Router();

// * API test relation between (employee + role)
routes.get(
  "/employee/test-relation/:id",
  requireUser,
  EmployeeController.testRelationForGetDetail
);
