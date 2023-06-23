const { PORT = '3000' } = process.env;
const { Database = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

module.exports = {
  PORT,
  Database,
};
