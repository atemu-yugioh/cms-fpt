import {
  EmployeePermissionAttributes,
  EmployeePermissionInstance,
} from "../entities/employeePermission.entities";

export class EmployeePermissionService {
  createEmployeePermission = async (
    employeePermission: EmployeePermissionAttributes
  ) => {
    const newEmployeePermission = await EmployeePermissionInstance.create(
      employeePermission
    );
    return newEmployeePermission.toJSON();
  };

  findByEmployeeIdAndPermissionId = async (
    employeeId: string,
    permissionId: string
  ) => {
    const employeePermission = await EmployeePermissionInstance.findOne({
      where: { employee_id: employeeId, permission_id: permissionId },
    });
    return employeePermission?.toJSON();
  };

  updateById = async (valid: { valid: boolean }, id: string) => {
    const employeePermission = await EmployeePermissionInstance.update(valid, {
      where: { id },
    });
    return employeePermission;
  };

  removeEmployeePermission = async (
    valid: { valid: boolean },
    conditionUpdate: { employee_id: string; permission_id: string }
  ) => {
    const employeePermission = await EmployeePermissionInstance.update(valid, {
      where: conditionUpdate,
    });
    return employeePermission;
  };
}
