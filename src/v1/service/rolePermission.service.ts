import {
  RolePermissionAttributes,
  RolePermissionInstance,
} from "../entities/rolePermission.entities";

export class RolePermissionService {
  createRolePermission = async (rolePermission: RolePermissionAttributes) => {
    const newRolePermission = await RolePermissionInstance.create(
      rolePermission
    );
    return newRolePermission.toJSON();
  };

  findByRoleIdAndPermissionId = async (
    roleId: string,
    permissionId: string
  ) => {
    const rolePermission = await RolePermissionInstance.findOne({
      where: { role_id: roleId, permission_id: permissionId },
    });
    return rolePermission?.toJSON();
  };

  updateById = async (valid: { valid: boolean }, id: string) => {
    const rolePermission = await RolePermissionInstance.update(valid, {
      where: { id },
    });
    return rolePermission;
  };
}
