/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var insertLastLogin = (userId, city, country, ipAddress, loginAt) => {
    let sql = `INSERT INTO lastlogin 
    (userId, city, country, ipAddress, loginAt)
     VALUES (${userId}, '${city}', '${country}', '${ipAddress}', ${loginAt} )`;
    return db.prepare(sql).run();
}

module.exports = insertLastLogin;