/**
 * Created by tichaona on 7/1/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateUserReviewCount = (userId, reviewCount) => {
    let sql = `UPDATE users SET 
    reviewCount = ${reviewCount} 
    WHERE userId = ${userId};`;
    //console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = updateUserReviewCount;