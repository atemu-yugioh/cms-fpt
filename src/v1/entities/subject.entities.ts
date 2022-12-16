import { mysqlDB } from "./../database/init.mysql";
import { DataTypes, Model } from "sequelize";

export interface SubjectAttributes {
  id: string;
  description: string;
  name: string;
}

export class SubjectInstance extends Model<SubjectAttributes> {}

SubjectInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
  { sequelize: mysqlDB, tableName: "subjects" }
);
