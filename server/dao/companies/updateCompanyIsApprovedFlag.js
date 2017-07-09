/**
 * Created by tichaona on 7/8/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateCompanyIsApprovedFlag = (companyId, isApproved) => {
    let sql = `UPDATE companies SET 
    isApproved = ${isApproved}
    WHERE companyId = ${companyId};`;
    return db.prepare(sql).run();
}

module.exports = updateCompanyIsApprovedFlag;