import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import { PermissionService } from "../service/permission.service";
import { RoleService } from "../service/role.service";
import { RolePermissionService } from "../service/rolePermission.service";
import { BaseResponse } from "../utils/base.response.utils";

class RolePermissionController {
  private rolePermissionService;
  private roleService;
  private permissionService;

  constructor() {
    this.rolePermissionService = new RolePermissionService();
    this.roleService = new RoleService();
    this.permissionService = new PermissionService();
  }

  createRolePermission = async (req: Request, res: Response) => {
    try {
      const response: BaseResponse = new BaseResponse();

      // * check role and permission
      const role = await this.roleService.findById(req.body.role_id);
      const permission = await this.permissionService.findById(
        req.body.permission_id
      );

      if (!role || !permission) {
        response.setStatus(StatusCodes.BAD_REQUEST);
        response.setMessage(
          StatusCodes.BAD_REQUEST,
          "Role or permission invalid!!!"
        );
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      // * check role-permission
      const rolePermission =
        await this.rolePermissionService.findByRoleIdAndPermissionId(
          req.body.role_id,
          req.body.permission_id
        );

      // * exist => update valid: true
      if (rolePermission) {
        const rolePermissionUpdated =
          await this.rolePermissionService.updateById(
            { valid: true },
            rolePermission.id
          );
        response.setData(rolePermissionUpdated);
        return res.status(StatusCodes.OK).json(response);
      }

      // * not exist => create new role-permission
      const id: string = uuidv4();
      const newRolePermission =
        await this.rolePermissionService.createRolePermission({
          ...req.body,
          id,
        });
      response.setData(newRolePermission);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}

export default new RolePermissionController();
