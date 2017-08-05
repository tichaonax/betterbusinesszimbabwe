/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findLastLoginByUserId = (userId) => {
    return db.prepare('select * from lastlogin where userId=? order by lastloginId desc limit 1').get(userId);
}

module.exports = findLastLoginByUserId;