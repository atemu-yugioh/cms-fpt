import { mysqlDB } from "./../database/init.mysql";
import { DataTypes, Model } from "sequelize";

export interface SessionAttributes {
  id: string;
  employee_id: string;
  valid: boolean;
  user_agent: string;
}

export class SessionInstance extends Model<SessionAttributes> {}

SessionInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    user_agent: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: mysqlDB, tableName: "sessions" }
);
