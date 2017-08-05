/**
 * Created by tichaona on 7/15/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateUsersIsAdminFlag = (userId, isAdmin) => {
    let sql = `UPDATE users SET 
    isAdmin = ${isAdmin}
    WHERE userId = ${userId};`;
    //console.log("slq", sql);
    return db.prepare(sql).run();
}

module.exports = updateUsersIsAdminFlag;