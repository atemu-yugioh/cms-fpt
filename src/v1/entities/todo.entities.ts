import { DataTypes, Model } from "sequelize";
import { mysqlDB } from "../database/init.mysql";

export interface TodoAttributes {
  id: string;
  title: string;
  completed: boolean;
}

export class TodoInstance extends Model<TodoAttributes> {}

TodoInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: mysqlDB,
    tableName: "todos",
  }
);
