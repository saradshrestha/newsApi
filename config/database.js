
const db_host = process.env.DB_HOST || 'localhost';
const db_username = process.env.DB_USERNAME || 'root';
const db_password = process.env.DB_PASSWORD || '';
const db_name = process.env.DB_NAME || 'newsApi';
const db_dialect = process.env.DB_DIALECT || 'mysql';



module.exports = {
    host: db_host,
    username: db_username,
    password: db_password,
    database: db_name,
    dialect: db_dialect, // explicitly specify the dialect
};