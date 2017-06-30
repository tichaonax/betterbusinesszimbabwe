var bbzSqlite = (() => {
    var instance;

    function createInstance(dbPath) {
        var Database = require('better-sqlite3');
        db = new Database(dbPath);

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
