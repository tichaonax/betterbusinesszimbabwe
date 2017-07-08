/**
 * Created by tichaona on 7/1/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateLastLogin = (userId, city, country, ipAddress, loginAt) => {
    let loginDate = (loginAt) ? `'${loginAt}'` : "DATETIME('NOW')";
    let sql = `UPDATE lastlogin SET 
    city = '${city}', 
    country = '${country}', 
    ipAddress = '${ipAddress}',
    loginAt = ${loginDate} 
    WHERE userId = ${userId};`;
    console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = updateLastLogin;