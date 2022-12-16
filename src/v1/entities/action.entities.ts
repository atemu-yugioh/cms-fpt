import { mysqlDB } from "./../database/init.mysql";
import { DataTypes, Model } from "sequelize";

export interface ActionAttributes {
  id: string;
  description: string;
  name: string;
}

export class ActionInstance extends Model<ActionAttributes> {}

ActionInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: mysqlDB, tableName: "actions" }
);
