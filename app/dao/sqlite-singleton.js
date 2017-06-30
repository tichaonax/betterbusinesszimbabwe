var bbzSqlite = (() => {
    var instance;

    function createInstance() {
        var Database = require('better-sqlite3');
        db = new Database('../app/database/betterbusinesszimbabwe.sqlite3');

        process.on('SIGINT', () => {
            db.close();
        });

        return db;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = bbzSqlite;
