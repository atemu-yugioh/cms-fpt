import { mysqlDB } from "../database/init.mysql";
import { DataTypes, Model } from "sequelize";
import { EmployeeInstance } from "./employee.entities";
import { RoleInstance } from "./role.entities";

export interface EmployeeRoleAttributes {
  id: string;
  employee_id: string;
  role_id: string;
  valid: boolean;
}

export class EmployeeRoleInstance extends Model<EmployeeRoleAttributes> {}

EmployeeRoleInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: EmployeeInstance,
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: RoleInstance,
        key: "id",
      },
    },
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: mysqlDB, tableName: "employee_roles" }
);

RoleInstance.belongsToMany(EmployeeInstance, {
  as: "employees",
  through: EmployeeRoleInstance,
  foreignKey: "role_id",
});
EmployeeInstance.belongsToMany(RoleInstance, {
  as: "roles",
  through: EmployeeRoleInstance,
  foreignKey: "employee_id",
});
