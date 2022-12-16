import express from "express";
import RolePermissionController from "../controller/rolePermission.controller";

export const routes = express.Router();

routes.post("/role-permission", RolePermissionController.createRolePermission);
