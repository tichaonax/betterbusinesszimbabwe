/**
 * Created by tichaona on 6/30/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../../constants/Database');
var bbzSqlite = require('../../sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var createReviewsTable = () => {
    console.log("create Users Table");
    let sql = `CREATE TABLE IF NOT EXISTS "reviews" (
  "reviewId" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "userId" integer,
  "adminUserId" integer,
  "companyItemId" integer,
  "rating" decimal(1,1) NOT NULL,
  "review" varchar(350),
  "isApproved" integer,
  "createAt" timestamp,
  "updateAt" timestamp
);

CREATE INDEX IF NOT EXISTS idx_reviews_review ON "reviews" ("review");

CREATE TRIGGER IF NOT EXISTS reviews_trigger_ai AFTER INSERT ON reviews
 BEGIN
  UPDATE reviews SET createAt = DATETIME('NOW')  WHERE rowid = new.rowid;
 END;

CREATE TRIGGER IF NOT EXISTS reviews_trigger_au AFTER UPDATE ON reviews
 BEGIN
  UPDATE reviews SET updateAt = DATETIME('NOW')  WHERE rowid = new.rowid;
 END;`;
    return db.exec(sql);
}

module.exports = createReviewsTable;