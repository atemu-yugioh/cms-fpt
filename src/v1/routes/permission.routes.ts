import express from "express";
import PermissionController from "../controller/permission.controller";

export const routes = express.Router();

// * Create permission
routes.post("/permission", PermissionController.createPermission);

// * Get all permission
routes.get("/permission", PermissionController.getAll);

// * Get detail permission
routes.get("/permission/:id", PermissionController.getDetail);

// * Update permission (valid)
routes.patch("/permission/:id", PermissionController.updateValid);
