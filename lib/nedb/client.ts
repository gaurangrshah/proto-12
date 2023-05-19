import path from 'path';
import Datastore from 'nedb';

const databaseFile = path.resolve('../../_data_/db.json');
export const client = new Datastore({ filename: databaseFile, autoload: true });
