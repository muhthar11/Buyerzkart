import * as Realm from "realm-web";
import envConfig from "../../env/env.json";

export const app = new Realm.App({ id: envConfig.MONGODB_APP_ID });
// export const gApp = new Realm.App({ id: envConfig.MONGODB_APP_ID_GENERAL });
  

export const {
  BSON: { ObjectId },
} = Realm;
export const getDBInstance = () => {
  if (!app || !app.currentUser) {
    return;
  }
  return app.currentUser.mongoClient("mongodb-atlas").db(envConfig.MONGODB_DB);
};



