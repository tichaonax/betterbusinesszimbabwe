/**
 * Created by tichaona on 7/04/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findReviewById = (reviewId) => {
    var sql = `select r.reviewId, r.userId,r.AdminUserId, r.companyId,
    r.isApproved,r.review, r.rating, c.companyTitle, 
    r.createAt, r.updateAt, u.displayName, u.email, u.photoURL, u.reviewCount
    from reviews r join users u
    on u.userId = r.userId
    join companies c
    on r.companyId = c.companyId
    where r.reviewId = ${reviewId}`;
    //console.log("sql->",sql);
    return db.prepare(sql).get();
}

module.exports = findReviewById;