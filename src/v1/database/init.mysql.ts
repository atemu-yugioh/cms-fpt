import { Sequelize } from "sequelize";
import config from "../../config/config";

export const mysqlDB = new Sequelize(
  "cms-fpt",
  config.mysql.user as string,
  config.mysql.password as string,
  { host: config.mysql.host as string, dialect: "mysql" }
);

const mysqlConnection = async () => {
  try {
    await mysqlDB.authenticate();
    console.log("Connection has been established successfully!");
    mysqlDB.sync().then(() => {
      console.log("sync database successfully!");
    });
  } catch (error) {
    console.log("Unable to connect to the database: ", error);
  }
};

export default mysqlConnection;
