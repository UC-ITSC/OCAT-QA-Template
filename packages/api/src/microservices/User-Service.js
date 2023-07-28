const { User } = require(`../database/models`);
const Sequelize = require(`sequelize`);
import config from 'config';

const {
  database,
  dialect,
  host,
  password,
  /* port */
  username,
  /* pool*/
} = config.get(`database`);

exports.login = async (user) => {

  const sequelize = new Sequelize(database, username, password, { dialect, host });
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database

  await sequelize.authenticate().then(() => {
    // eslint-disable-next-line no-console
    console.log(`Connection to ${database} has been established successfully.`);
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Unable to connect to the database: `, error);
  });

  const [ enteredUser ] = await User.findAll({
    where: {
      username: user,
    },
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Unable to find user`, error);
  });

  return enteredUser;

};
