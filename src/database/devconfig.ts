export default () => {
  return {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbname: process.env.DB_NAME,
    port: process.env.DB_PORT,
  };
};
