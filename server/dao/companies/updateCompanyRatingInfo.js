/**
 * Created by tichaona on 7/14/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateCompanyRatingInfo = (companyId, rating, reviewCount) => {
    let sql = `UPDATE companies SET 
    rating = ${rating}, 
    reviewCount = ${reviewCount}
    WHERE companyId = ${companyId};`;
    console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = updateCompanyRatingInfo;