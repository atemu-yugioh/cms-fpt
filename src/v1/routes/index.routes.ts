import express, { Express, NextFunction, Request, Response } from "express";
import { routes as todoRoutes } from "./todo.routes";
import { routes as authRoutes } from "./auth.routes";
import { routes as actionRoutes } from "./action.routes";
import { routes as subjectRoutes } from "./subject.routes";
import { routes as roleRoutes } from "./role.routes";
import { routes as permissionRoutes } from "./permission.routes";
import { routes as employeePermissionRoutes } from "./employeePermission.routes";
import { routes as RolePermissionRoutes } from "./rolePermission.routes";
import { routes as employeeRoleRoutes } from "./employeeRole.routes";
import { routes as employeeRoutes } from "./employee.routes";

const router = express.Router();

const routes = (app: Express) => {
  // * HEALTH CHECK API

  router.get(
    "health-check",
    (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200);
    }
  );

  // * TODO ROUTES
  router.use(todoRoutes);

  // * AUTH ROUTES
  router.use(authRoutes);

  // * ACTION ROUTES
  router.use(actionRoutes);

  // * SUBJECT ROUTES
  router.use(subjectRoutes);

  // * ROLE ROUTES
  router.use(roleRoutes);

  // * PERMISSION ROUTES
  router.use(permissionRoutes);

  // * EMPLOYEE PERMISSION ROUTES
  router.use(employeePermissionRoutes);

  // * ROLE PERMISSION ROUTES
  router.use(RolePermissionRoutes);

  // * EMPLOYEE ROLE ROUTES
  router.use(employeeRoleRoutes);

  // * EMPLOYEE ROUTES
  router.use(employeeRoutes);

  app.use("/api", router);
};

export default routes;
