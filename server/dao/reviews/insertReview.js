/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var insertReview = (userId, adminUserId, companyId, rating, review, isApproved, createAt) => {
    let createDate = (createAt) ? `'${createAt}'` : "DATETIME('NOW')";
    let sql = `INSERT INTO reviews 
    (userId, adminUserId, companyId, rating, review, isApproved, createAt, updateAt)
     VALUES (${userId}, ${adminUserId}, ${companyId}, ${rating}, '${review}', 
     ${isApproved}, ${createDate}, DATETIME('NOW'))`;
    //console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = insertReview;