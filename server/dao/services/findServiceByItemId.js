/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findServiceByItemId = (serviceItemId) => {
    return db.prepare('select * from services where serviceItemId=?').get(serviceItemId);
}

module.exports = findServiceByItemId;