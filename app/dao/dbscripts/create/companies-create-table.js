/**
 * Created by tichaona on 6/30/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../../constants/Database');
var bbzSqlite = require('../../sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var createCompaniesTable = () => {
    console.log("create Users Table");
    let sql = `CREATE TABLE IF NOT EXISTS "companies" (
  "companyId" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "userId" integer(128),
  "serviceId" integer,
  "companyTitle" varchar(100),
  "companyDesc" varchar(300),
  "rating" decimal(1,1),
  "reviewCount" integer,
  "isApproved" integer,
  "createAt" timestamp,
  "updateAt" timestamp
);

CREATE INDEX IF NOT EXISTS idx_companies_companyTitle ON "companies" ("companyTitle");

CREATE INDEX IF NOT EXISTS idx_companies_companyDesc ON "companies" ("companyDesc");

CREATE TRIGGER IF NOT EXISTS companies_trigger_ai AFTER INSERT ON companies
 BEGIN
  UPDATE companies SET createAt = DATETIME('NOW')  WHERE rowid = new.rowid;
 END;

CREATE TRIGGER IF NOT EXISTS companies_trigger_au AFTER UPDATE ON companies
 BEGIN
  UPDATE companies SET updateAt = DATETIME('NOW')  WHERE rowid = new.rowid;
 END;`;
    return db.exec(sql);
}

module.exports = createCompaniesTable;