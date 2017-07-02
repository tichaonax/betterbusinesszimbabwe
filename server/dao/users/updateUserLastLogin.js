/**
 * Created by tichaona on 7/1/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateUserLastLogin = (userId, city, country, ipAddress) => {
    let sql = `UPDATE users SET 
    city = '${city}', 
    country = '${country}', 
    ipAddress = '${ipAddress}',
    loginAt = DATETIME('NOW') 
    WHERE userId = ${userId};`;
    //console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = updateUserLastLogin;