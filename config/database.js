const db_addr = process.env.MONGODB_ATLAS_CLUSTER_ADDR;
const db_user = process.env.MONGODB_ATLAS_USER;
const db_password = process.env.MONGODB_ATLAS_PASSWORD;
const db_name = process.env.MONGODB_ATLAS_DB;

const connection = `mongodb+srv://${db_user}:${db_password}@${db_addr}/${db_name}?retryWrites=true&w=majority`;

module.exports = connection;
