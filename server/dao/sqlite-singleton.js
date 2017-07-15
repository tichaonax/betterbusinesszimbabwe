var bbzSqlite = (() => {
    var instance;

    function createInstance(dbPath) {
        console.log("dbPath", dbPath);
        var Database = require('better-sqlite3');
        let db = new Database(dbPath);

        process.on('SIGINT', () => {
            db.close();
            console.log("Sqlite database closed");
            server.close();
        });

        return db;
    }

    return {
        getInstance: function (dbPath) {
            if (!instance) {
                instance = createInstance(dbPath);
                console.log("Sqlite new instance database created");
            }
            return instance;
        }
    };
})();

module.exports = bbzSqlite;
