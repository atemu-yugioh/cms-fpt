import { mysqlDB } from "./../database/init.mysql";
import { DataTypes, Model, Sequelize } from "sequelize";

export interface RoleAttributes {
  id: string;
  description: string;
  name: string;
  // valid: boolean;
}

export class RoleInstance extends Model<RoleAttributes> {}

RoleInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", (value as string).toUpperCase());
      },
    },
    // valid: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    // },
  },
  { sequelize: mysqlDB, tableName: "roles" }
);
