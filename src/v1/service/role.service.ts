import { RoleAttributes } from "./../entities/role.entities";
import { RoleInstance } from "../entities/role.entities";
import { EmployeeInstance } from "../entities/employee.entities";
import { PermissionInstance } from "../entities/permission.entities";

export class RoleService {
  createRole = async (role: RoleAttributes) => {
    const newRole = await RoleInstance.create(role);
    return newRole.toJSON();
  };

  findById = async (id: string) => {
    const role = await RoleInstance.findByPk(id, {
      include: [
        {
          model: EmployeeInstance,
          as: "employees",
          attributes: ["email", "full_name"],
          through: {
            attributes: [],
          },
        },
        {
          model: PermissionInstance,
          as: "permissions",
          attributes: ["name", "description"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return role ? role?.toJSON() : null;
  };

  getAll = async () => {
    const roles = await RoleInstance.findAndCountAll({
      distinct: true, // only count role
      include: [
        {
          model: EmployeeInstance,
          as: "employees",
          attributes: ["email", "full_name"],
          through: {
            attributes: [],
          },
        },
        {
          model: PermissionInstance,
          as: "permissions",
          attributes: ["name", "description"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return { total_record: roles.count, list: roles.rows };
  };

  updateName = async (name: { name: string }, id: string) => {
    const role = RoleInstance.update(name, { where: { id } });
    return role;
  };
}
