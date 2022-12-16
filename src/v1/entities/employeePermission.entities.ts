import { mysqlDB } from "../database/init.mysql";
import { DataTypes, Model } from "sequelize";
import { PermissionInstance } from "./permission.entities";
import { EmployeeInstance } from "./employee.entities";

export interface EmployeePermissionAttributes {
  id: string;
  employee_id: string;
  permission_id: string;
  valid: boolean;
}

export class EmployeePermissionInstance extends Model<EmployeePermissionAttributes> {}

EmployeePermissionInstance.init(
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
    },
    permission_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: mysqlDB, tableName: "employee_permissions" }
);

PermissionInstance.belongsToMany(EmployeeInstance, {
  as: "employees",
  through: EmployeePermissionInstance,
  foreignKey: "permission_id",
});

EmployeeInstance.belongsToMany(PermissionInstance, {
  as: "permissions",
  through: EmployeePermissionInstance,
  foreignKey: "employee_id",
});
