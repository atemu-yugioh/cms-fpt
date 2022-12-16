import * as dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT_APP,
  host: process.env.HOST,
  mongo_uri: process.env.MONGO_URI,
  mysql: {
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
  },
  salt: 10,
  private_key: "private_key",
  access_token_ttl: "1h",
  refresh_token_ttl: "1y",
};
