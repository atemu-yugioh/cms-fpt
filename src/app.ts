import express from "express";
import config from "./config/config";
import mysqlConnection from "./v1/database/init.mysql";
import deserialize from "./v1/middleware/deserializeUser";
import routes from "./v1/routes/index.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserialize);

app.listen(config.port, () => {
  console.log(`Server running on port::: ${config.port}`);

  // * Connect to mysql
  mysqlConnection();

  routes(app);
});
