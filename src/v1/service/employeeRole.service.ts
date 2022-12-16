import {
  EmployeeRoleAttributes,
  EmployeeRoleInstance,
} from "../entities/employeeRole.entities";

export class EmployeeRoleService {
  createEmployeeRole = async (employeeRole: EmployeeRoleAttributes) => {
    const newEmployeeRole = await EmployeeRoleInstance.create(employeeRole);
    return newEmployeeRole.toJSON();
  };

  findByEmployeeIdAndRoleId = async (employeeId: string, roleId: string) => {
    const employeeRole = await EmployeeRoleInstance.findOne({
      where: { employee_id: employeeId, role_id: roleId },
    });
    return employeeRole?.toJSON();
  };

  updateById = async (valid: { valid: boolean }, id: string) => {
    const employeeRole = await EmployeeRoleInstance.update(valid, {
      where: { id },
    });
    return employeeRole;
  };
}
