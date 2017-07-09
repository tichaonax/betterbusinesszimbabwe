/**
 * Created by tichaona on 7/8/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateCompany = (companyId, serviceId, companyTitle, companyDesc, rating, reviewCount, isApproved) => {
    let sql = `UPDATE companies SET 
    serviceId = ${serviceId}, 
    companyTitle = '${companyTitle}', 
    companyDesc = '${companyDesc}', 
    rating = ${rating},
    reviewCount =${reviewCount},
    isApproved = ${isApproved}
    WHERE companyId = '${companyId}';`;
    return db.prepare(sql).run();
}

module.exports = updateCompany;