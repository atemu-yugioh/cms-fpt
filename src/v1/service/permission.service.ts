import { EmployeeInstance } from "../entities/employee.entities";
import {
  PermissionAttributes,
  PermissionInstance,
} from "../entities/permission.entities";
import { RoleInstance } from "../entities/role.entities";

export class PermissionService {
  createPermission = async (permission: PermissionAttributes) => {
    const newPermission = await PermissionInstance.create(permission);
    return newPermission.toJSON();
  };

  findByActIdAndSubId = async (actionId: string, subjectId: string) => {
    const permission = await PermissionInstance.findOne({
      where: { action_id: actionId, subject_id: subjectId },
    });
    return permission?.toJSON();
  };

  findById = async (id: string) => {
    const permission = await PermissionInstance.findByPk(id, {
      attributes: { exclude: ["action_id", "subject_id"] },
      include: [
        {
          model: RoleInstance,
          as: "roles",
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
        {
          model: EmployeeInstance,
          as: "employees",
          attributes: ["email", "full_name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return permission ? permission?.toJSON() : null;
  };

  getAll = async () => {
    const permissions = await PermissionInstance.findAndCountAll({
      distinct: true, // only count permission
      attributes: { exclude: ["action_id", "subject_id"] },
      include: [
        {
          model: RoleInstance,
          as: "roles",
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
        {
          model: EmployeeInstance,
          as: "employees",
          attributes: ["email", "full_name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return { total_record: permissions.count, list: permissions.rows };
  };

  updateValid = async (valid: { valid: boolean }, id: string) => {
    const permission = await PermissionInstance.update(valid, {
      where: { id },
    });
    return permission;
  };
}
