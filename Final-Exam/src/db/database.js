
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'students.db',
  logging: false
});

export default sequelize;
