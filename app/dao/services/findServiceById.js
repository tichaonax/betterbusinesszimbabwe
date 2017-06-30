/**
 * Created by tichaona on 6/29/17.
 */
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance();

var findServiceById = (serviceId) => {
    return db.prepare('select * from services where serviceId=?').get(serviceId);
}

module.exports = findServiceById;