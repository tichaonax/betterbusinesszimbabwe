/**
 * Created by tichaona on 6/30/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../../constants/Database');
var bbzSqlite = require('../../sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var createServicesTable = () => {

    console.log("create Services Table");
    let sql = `CREATE TABLE IF NOT EXISTS "services" (
  "serviceId" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "userId" integer,
  "serviceItemId" integer,
  "serviceCategory" varchar(100),
  "createAt" timestamp,
  "updateAt" timestamp
);

CREATE INDEX IF NOT EXISTS idx_services_serviceCategory ON "services" ("serviceCategory");

CREATE TRIGGER IF NOT EXISTS services_trigger_ai AFTER INSERT ON services
 BEGIN
  UPDATE services SET createAt = DATETIME('NOW')  WHERE rowid = new.rowid;
 END;

CREATE TRIGGER IF NOT EXISTS services_trigger_au AFTER UPDATE ON services
 BEGIN
  UPDATE services SET updateAt = DATETIME('NOW')  WHERE rowid = new.rowid;
 END;`;
    return db.exec(sql);
}

module.exports = createServicesTable;