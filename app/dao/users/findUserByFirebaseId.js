/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findUserByFirebaseId = (firebaseId) => {
    return db.prepare('select * from users where firebaseId=?').get(firebaseId);
}

module.exports = findUserByFirebaseId;