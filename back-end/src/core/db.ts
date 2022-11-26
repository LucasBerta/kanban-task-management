import { connect } from 'mongoose';

export default async function connectToDatabase() {
  await connect('' + process.env.DB_CONN_STRING + process.env.DB_NAME);
}
