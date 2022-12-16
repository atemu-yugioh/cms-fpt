import { omit } from "lodash";
import { RoleInstance } from "../entities/role.entities";
import {
  EmployeeAttributes,
  EmployeeInstance,
} from "./../entities/employee.entities";

export default class EmployeeService {
  createEmployee = async (employee: EmployeeAttributes) => {
    const newEmployee = await EmployeeInstance.create(employee);
    return omit(newEmployee.toJSON(), "password");
  };

  validatePassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const employee = await EmployeeInstance.findOne({ where: { email } });

    if (!employee) {
      return false;
    }

    const isValid: boolean = await employee.comparePassword(password);

    if (!isValid) {
      return false;
    }

    return omit(employee.toJSON(), "password");
  };

  findByEmail = async (email: string) => {
    const employee = await EmployeeInstance.findOne({ where: { email } });

    return employee ? omit(employee?.toJSON(), "password") : null;
  };

  findById = async (id: string) => {
    const employee = await EmployeeInstance.findByPk(id);
    return employee ? omit(employee?.toJSON(), "password") : null;
  };

  testRelationForGetDetail = async (id: string) => {
    const employee = await EmployeeInstance.findOne({
      where: { id },
      attributes: ["email", "full_name"],
      include: [
        {
          model: RoleInstance,
          as: "roles",
          attributes: ["description", "name"],
          through: {
            as: "employee_role",
            attributes: ["employee_id", "role_id"],
          },
        },
      ],
    });

    return employee ? omit(employee?.toJSON(), "password") : null;
  };
}
