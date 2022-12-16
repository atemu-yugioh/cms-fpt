import { mysqlDB } from "../database/init.mysql";
import { DataTypes, Model } from "sequelize";

export interface PermissionAttributes {
  id: string;
  action_id: string;
  subject_id: string;
  name: string;
  description: string;
  valid: boolean;
}

export class PermissionInstance extends Model<PermissionAttributes> {}

PermissionInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    action_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: mysqlDB, tableName: "permissions" }
);
