/**
 * Created by tichaona on 6/30/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../../constants/Database');
var bbzSqlite = require('../../sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var createUsersTable = () => {
    console.log("create Users Table");
    let sql = `CREATE TABLE IF NOT EXISTS "users" (
  "userId" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "firebaseId" varchar(45) NOT NULL,
  "displayName" varchar(100) NOT NULL,
  "email" varchar(100) NOT NULL,
  "photoURL" varchar(200) NOT NULL,
  "providerId" varchar(50),
  "uid" varchar(45) NOT NULL,
  "reviewCount" numeric NOT NULL,
  "createAt" timestamp,
  "updateAt" timestamp,
  "city" varchar(100),
  "country" varchar(100), 
  "ipAddress" varchar(30), 
  "loginAt" timestamp
);

CREATE INDEX IF NOT EXISTS idx_users_displayName ON "users" ("displayName");

CREATE TRIGGER IF NOT EXISTS users_trigger_ai AFTER INSERT ON users
 BEGIN
  UPDATE users SET createAt = DATETIME('NOW')  WHERE rowid = new.rowid;
 END;

CREATE TRIGGER IF NOT EXISTS users_trigger_au AFTER UPDATE ON users
 BEGIN
  UPDATE users SET updateAt = DATETIME('NOW')  WHERE rowid = new.rowid;
 END;`;
    return db.exec(sql);
}

module.exports = createUsersTable;