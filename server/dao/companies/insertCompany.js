/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var insertCompany = (userId, serviceId, companyTitle, companyDesc, rating, reviewCount, isApproved) => {
    let sql = `INSERT INTO companies 
    (userId, serviceId, companyTitle, companyDesc, rating, reviewCount, isApproved, updateAt)
     VALUES ('${userId}', ${serviceId}, '${companyTitle}', '${companyDesc}', ${rating}, 
     ${reviewCount}, ${isApproved}, DATETIME('NOW'))`;
    //console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = insertCompany;