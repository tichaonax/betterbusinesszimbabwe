/**
 * Created by tichaona on 7/18/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findUserReviewCountById = (userId) => {
    var sql = `select count(*) as count from reviews where userId = ${userId} and isApproved = 1`;
    return db.prepare(sql).get();
}

module.exports = findUserReviewCountById;