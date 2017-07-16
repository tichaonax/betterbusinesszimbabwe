/**
 * Created by tichaona on 7/15/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateReviewIsApprovedFlag = (reviewId, isApproved, adminUserId) => {
    let sql = `UPDATE reviews SET 
    isApproved = ${isApproved},
    adminUserId = ${adminUserId}
    WHERE reviewId = ${reviewId};`;
    //console.log("slq", sql);
    return db.prepare(sql).run();
}

module.exports = updateReviewIsApprovedFlag;