/**
 * Created by tichaona on 7/14/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateReviewInfo = (reviewId, review, rating, userId) => {
    let sql = `UPDATE reviews SET 
    review = '${review}', 
    rating = ${rating}, 
    isApproved = 0
    WHERE reviewId = ${reviewId}
    AND userId = ${userId};`;
    //console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = updateReviewInfo;