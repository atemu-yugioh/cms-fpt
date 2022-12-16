import { mysqlDB } from "./../database/init.mysql";
import { DataTypes, Model } from "sequelize";
import { RoleInstance } from "./role.entities";
import { PermissionInstance } from "./permission.entities";

export interface RolePermissionAttributes {
  id: string;
  permission_id: string;
  role_id: string;
  valid: boolean;
}

export class RolePermissionInstance extends Model<RolePermissionAttributes> {}

RolePermissionInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    permission_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: mysqlDB, tableName: "role_permissions" }
);

RoleInstance.belongsToMany(PermissionInstance, {
  as: "permissions",
  through: RolePermissionInstance,
  foreignKey: "role_id",
});

PermissionInstance.belongsToMany(RoleInstance, {
  as: "roles",
  through: RolePermissionInstance,
  foreignKey: "permission_id",
});
