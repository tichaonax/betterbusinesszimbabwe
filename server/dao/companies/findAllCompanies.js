/**
 * Created by tichaona on 7/8/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findAllCompanies = () => {
    return db.prepare('select * from companies').all();
}

module.exports = findAllCompanies;