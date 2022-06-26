import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

let _db;

export const mongoConnect = async () => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ynx918k.mongodb.net/simple-profile?retryWrites=true&w=majority`,
      {
        keepAlive: true,
      }
    );
    console.log("Connected to DB");
    _db = client.db();
  } catch (error) {
    throw error;
  }
};

export const getDB = () => {
  if (_db) {
    return _db;
  }
  throw new Error("Database not found");
};
