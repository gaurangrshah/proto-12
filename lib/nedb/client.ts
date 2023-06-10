import path from 'path';
import Datastore from 'nedb';

const prefsDb = path.resolve('../../_data_/prefs', 'database.db');

export const db = {} as Record<string, Datastore>;
db.prefs = new Datastore({ filename: prefsDb, autoload: true });
