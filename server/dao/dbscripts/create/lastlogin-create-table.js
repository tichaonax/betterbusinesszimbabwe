/**
 * Created by tichaona on 6/30/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../../constants/Database');
var bbzSqlite = require('../../sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var createLastLoginTable = () => {
    console.log("create LastLogin Table");
    let sql = `CREATE TABLE IF NOT EXISTS "lastlogin" (
  "lastloginId" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "userId" integer,
  "city" varchar(100),
  "country" varchar(100),
  "ipAddress" varchar(30),
  "loginAt" timestamp
);

CREATE INDEX IF NOT EXISTS idx_lastlogin_country ON "lastlogin" ("country");

CREATE INDEX IF NOT EXISTS idx_lastlogin_city ON "lastlogin" ("city");`;
    return db.exec(sql);
}

module.exports = createLastLoginTable;