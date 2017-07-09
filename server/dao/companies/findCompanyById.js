/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findCompanyById = (companyId) => {
    return db.prepare('select * from companies where companyId=?').get(companyId);
}

module.exports = findCompanyById;