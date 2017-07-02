/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var insertReview = (userId, adminUserId, companyId, rating, review, isApproved, createAt) => {
    let sql = `INSERT INTO reviews 
    (userId, adminUserId, companyId, rating, review, isApproved, createAt)
     VALUES (${userId}, ${adminUserId}, ${companyId}, ${rating}, '${review}', 
     ${isApproved}, '${createAt}')`;
    //console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = insertReview;