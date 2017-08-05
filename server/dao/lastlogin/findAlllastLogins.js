/**
 * Created by tichaona on 7/4/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findAlllastLogins = () => {
    return db.prepare('select * from lastlogin').all();
}

module.exports = findAlllastLogins;