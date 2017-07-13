/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findCompanyById = (companyId) => {
    let sql =`select c.companyId, c.userId, c.serviceId, c.companyTitle,
        c.companyDesc, c.rating, c.reviewCount, c.createAt, 
        c.updateAt, s.serviceItemId, s.serviceCategory,
         cast(case when c.isApproved is null or c.isApproved is 0 then 'false' else 'true' end as varchar) as isApproved
         from 
        companies c
        join services s
        on c.serviceId = s.serviceId
        where companyId=?`;
    return db.prepare(sql).get(companyId);
}

module.exports = findCompanyById;