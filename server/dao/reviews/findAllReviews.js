/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findAllReviews = (param) => {
    let criteria = (param) ? param : '';
    var sql =`select r.reviewId, r.userId, r.AdminUserId, r.companyId,
    r.isApproved, r.review, r.rating, c.companyTitle, 
    r.createAt, r.updateAt, u.displayName, u.email, u.photoURL, u.reviewCount
    from reviews r join users u
    on u.userId = r.userId
    join companies c
    on r.companyId = c.companyId 
       where r.review like '%${criteria}%'
    or c.companyTitle like '%${criteria}%'
    or u.userid = '${criteria}'
    or r.rating ='${criteria}'
    or displayName like '${criteria}'
    order by r.updateAt desc
    limit 50`;
    return db.prepare(sql).all();
}

module.exports = findAllReviews;