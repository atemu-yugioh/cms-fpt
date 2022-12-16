import express, { Router } from "express";
import RoleController from "../controller/role.controller";

export const routes = express.Router();

// * Create role
routes.post("/role", RoleController.createRole);

// * Get all role
routes.get("/role", RoleController.getAll);

// * Get detail role
routes.get("/role/:id", RoleController.getDetail);

// * Update (name) role
routes.patch("/role/:id", RoleController.updateName);
