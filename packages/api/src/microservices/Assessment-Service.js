const { Assessment } = require(`../database/models`);
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

exports.submit = async (assessment) => {

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

  Assessment.create({
    catDateOfBirth: assessment.assessment.catBirth,
    catName: assessment.assessment.catName,
    createdAt: new Date(),
    instrumentType: 1,
    riskLevel: assessment.assessment.riskLevel,
    score: assessment.assessment.score,
    updatedAt: new Date(),
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Unable to create assessment: `, error);
  });

};

exports.getList = async () => {
  const sequelize = new Sequelize(database, username, password, { dialect, host });

  await sequelize.authenticate().then(() => {
    // eslint-disable-next-line no-console
    console.log(`Connection to ${database} has been established successfully.`);
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Unable to connect to the database: `, error);
  });

  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = await Assessment.findAll();

  return assessments;
};

exports.delete = async (token, assessmentId) => {
  const sequelize = new Sequelize(database, username, password, { dialect, host });

  await sequelize.authenticate().then(() => {
    // eslint-disable-next-line no-console
    console.log(`Connection to ${database} has been established successfully.`);
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Unable to connect to the database: `, error);
  });

  const assessments = await Assessment.destroy({ where: { id: assessmentId } });

  return assessments;
};
