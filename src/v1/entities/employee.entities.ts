import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import config from "../../config/config";
import { mysqlDB } from "./../database/init.mysql";

export interface EmployeeAttributes {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  birth_day: string;
  gender: string;
  salary: number;
  password: string;
  full_name: string;
}

export class EmployeeInstance extends Model<EmployeeAttributes> {
  getFullName() {
    return [
      this.getDataValue("first_name"),
      this.getDataValue("last_name"),
    ].join(" ");
  }

  comparePassword = async (password: string) => {
    return await bcrypt.compare(password, this.getDataValue("password"));
  };
}

EmployeeInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birth_day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "male",
    },
    salary: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: mysqlDB, tableName: "employees" }
);

EmployeeInstance.beforeCreate(async (employee: EmployeeInstance) => {
  // * Set Full Name
  employee.setDataValue(
    "full_name",
    `${employee.getDataValue("first_name")} ${employee.getDataValue(
      "last_name"
    )}`
  );

  // * Hash Password
  if (employee.isNewRecord) {
    const salt: string = await bcrypt.genSalt(config.salt);
    const hashedPassword: string = await bcrypt.hash(
      employee.getDataValue("password"),
      salt
    );
    employee.setDataValue("password", hashedPassword);
  }
});
