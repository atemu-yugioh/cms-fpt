import express from "express";
import AuthController from "../controller/auth.controller";
import requireUser from "../middleware/requireUser.middleware";

export const routes = express.Router();

// * Register (create employee)
routes.post("/auth/register", AuthController.register);

// * Login
routes.post("/auth/login", AuthController.login);

// * Logout
routes.post("/auth/logout", requireUser, AuthController.logout);
